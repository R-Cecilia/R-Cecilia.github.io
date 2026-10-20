#!/usr/bin/env python3
"""Check a built site's local links, assets, and notebook navigation."""

from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text: str):
        super().__init__()
        self.refs: list[str] = []
        self.chapters: list[str] = []
        self.active: list[str] = []
        self.reader = False
        self.in_chapters = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        self.reader |= "notebook-reader" in classes
        if tag == "nav" and "notebook-chapters" in classes:
            self.in_chapters = True
        for attribute in ("src", "href", "poster"):
            if attrs.get(attribute):
                self.refs.append(attrs[attribute])
        if tag == "a" and self.in_chapters:
            self.chapters.append(attrs["href"])
            if attrs.get("aria-current") == "page":
                self.active.append(attrs["href"])

    def handle_endtag(self, tag):
        if tag == "nav":
            self.in_chapters = False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="Hugo build output directory")
    parser.add_argument("--base-url", default="https://r-cecilia.github.io/")
    args = parser.parse_args()
    root = args.directory.resolve()
    base = args.base_url.rstrip("/") + "/"
    origin = urlsplit(base)
    base_path = unquote(origin.path)
    errors: set[str] = set()
    notebooks: dict[str, list[str]] = {}
    page_count = 0

    def target(source: Path, reference: str) -> Path | None:
        source_url = urljoin(base, source.relative_to(root).as_posix())
        url = urlsplit(urljoin(source_url, reference))
        if url.scheme not in ("http", "https") or url.netloc != origin.netloc:
            return None
        path = unquote(url.path)
        if not path.startswith(base_path):
            errors.add(f"{source.relative_to(root)}: outside base URL: {reference}")
            return None
        local = (root / path[len(base_path):]).resolve()
        if not local.is_relative_to(root):
            errors.add(f"{source.relative_to(root)}: outside output directory: {reference}")
            return None
        if local.is_dir():
            local /= "index.html"
        if not local.is_file():
            errors.add(f"{source.relative_to(root)}: missing target: {reference}")
        return local

    for file in sorted(root.rglob("*.html")):
        page_count += 1
        page = Page(file.read_text(encoding="utf-8"))
        for ref in page.refs:
            target(file, ref)
        if page.reader:
            if not page.chapters or len(page.active) != 1:
                errors.add(f"{file.relative_to(root)}: expected one active notebook chapter")
                continue
            if target(file, page.active[0]) != file:
                errors.add(f"{file.relative_to(root)}: active chapter points to another page")
            overview = page.chapters[0]
            if notebooks.setdefault(overview, page.chapters) != page.chapters:
                errors.add(f"{file.relative_to(root)}: inconsistent chapter order")

    for file in root.rglob("*.css"):
        for ref in re.findall(r"url\(\s*[\"']?([^\"')]+)", file.read_text(encoding="utf-8")):
            target(file, ref.strip())

    if not page_count:
        errors.add("No HTML pages found; build the site first.")
    if errors:
        print("\n".join(sorted(errors)))
        return 1
    print(f"Validated {page_count} HTML pages, local asset references, and {len(notebooks)} notebooks.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
