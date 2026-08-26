#!/usr/bin/env python3
"""Validate local image references used by Markdown content."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
STATIC_DIR = ROOT / "static"

MARKDOWN_IMAGE = re.compile(
    r"!\[[^\]]*\]\(\s*(?:<(?P<angle>[^>]+)>|(?P<plain>[^\s)]+))",
    re.MULTILINE,
)
HTML_IMAGE = re.compile(
    r"<img\b[^>]*\bsrc\s*=\s*[\"'](?P<src>[^\"']+)[\"']",
    re.IGNORECASE,
)
WINDOWS_ABSOLUTE = re.compile(r"^[A-Za-z]:[\\/]")


def has_exact_case(path: Path) -> bool:
    """Return True only if every component exists with identical casing."""
    try:
        parts = path.resolve(strict=False).relative_to(ROOT).parts
    except ValueError:
        return False

    current = ROOT
    for part in parts:
        try:
            names = {child.name for child in current.iterdir()}
        except OSError:
            return False
        if part not in names:
            return False
        current /= part
    return current.is_file()


def local_target(markdown_file: Path, raw_target: str) -> tuple[Path | None, str | None]:
    target = unquote(raw_target.strip())

    if WINDOWS_ABSOLUTE.match(target):
        return None, "uses a local Windows path; use /images/... for files under static/images"
    if target.startswith("//"):
        return None, None

    parsed = urlsplit(target)
    if parsed.scheme or not parsed.path or parsed.path.startswith("{{"):
        return None, None

    path = parsed.path.replace("\\", "/")
    if path.startswith("/static/") or path.startswith("static/"):
        return None, "includes static in the URL; files under static are served from /"
    if path.startswith("/"):
        return STATIC_DIR / path.lstrip("/"), None
    return markdown_file.parent / path, None


def main() -> int:
    errors: list[str] = []
    checked = 0

    for markdown_file in sorted(CONTENT_DIR.rglob("*.md")):
        text = markdown_file.read_text(encoding="utf-8")
        matches = [
            (match.start(), match.group("angle") or match.group("plain"))
            for match in MARKDOWN_IMAGE.finditer(text)
        ]
        matches.extend(
            (match.start(), match.group("src")) for match in HTML_IMAGE.finditer(text)
        )

        for offset, target in sorted(matches):
            line = text.count("\n", 0, offset) + 1
            candidate, reason = local_target(markdown_file, target)
            if reason:
                errors.append(f"{markdown_file.relative_to(ROOT)}:{line}: {reason}: {target}")
                continue
            if candidate is None:
                continue
            checked += 1
            if not has_exact_case(candidate):
                errors.append(
                    f"{markdown_file.relative_to(ROOT)}:{line}: image not found with exact case: "
                    f"{target}"
                )

    if errors:
        print("Markdown image validation failed:", file=sys.stderr)
        print("\n".join(f"- {error}" for error in errors), file=sys.stderr)
        return 1

    print(f"Validated {checked} local Markdown image reference(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
