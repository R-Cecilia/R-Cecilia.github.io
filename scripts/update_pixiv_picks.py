#!/usr/bin/env python3
"""Fetch a small, SFW subset of Pixiv's public daily illustration ranking."""

from __future__ import annotations

import json
import os
import sys
import tempfile
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


RANKING_MODE = os.environ.get("PIXIV_RANKING_MODE", "daily")
ITEM_LIMIT = max(1, min(12, int(os.environ.get("PIXIV_PICKS_LIMIT", "5"))))
IMAGE_PROXY = os.environ.get("PIXIV_IMAGE_PROXY", "https://i.pixiv.re").rstrip("/")
RANKING_ENDPOINT = (
    "https://www.pixiv.net/ranking.php?"
    + urllib.parse.urlencode(
        {"mode": RANKING_MODE, "content": "illust", "format": "json", "p": "1"}
    )
)
RANKING_PAGE = (
    "https://www.pixiv.net/ranking.php?"
    + urllib.parse.urlencode({"mode": RANKING_MODE, "content": "illust"})
)
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "pixiv_picks.json"


def fetch_ranking() -> dict:
    request = urllib.request.Request(
        RANKING_ENDPOINT,
        headers={
            "Accept": "application/json",
            "Referer": RANKING_PAGE,
            "User-Agent": "Mozilla/5.0 (compatible; CeciliaBlog/1.0)",
        },
    )
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.load(response)


def is_safe(item: dict) -> bool:
    content = item.get("illust_content_type") or {}
    blocked_flags = ("sexual", "lo", "grotesque", "violent", "drug", "antisocial")
    if any(bool(content.get(flag)) for flag in blocked_flags):
        return False

    blocked_tags = {"R-18", "R18", "R-18G", "R18G"}
    tags = {str(tag).upper() for tag in item.get("tags") or []}
    return not tags.intersection(blocked_tags) and not item.get("is_masked", False)


def proxy_image_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    if parsed.netloc != "i.pximg.net":
        return url
    return f"{IMAGE_PROXY}{parsed.path}"


def build_payload(data: dict) -> dict:
    picks = []
    for item in data.get("contents") or []:
        if not is_safe(item):
            continue

        artwork_id = str(item.get("illust_id", "")).strip()
        artist_id = str(item.get("user_id", "")).strip()
        image_url = str(item.get("url", "")).strip()
        if not artwork_id or not artist_id or not image_url:
            continue

        content = item.get("illust_content_type") or {}
        picks.append(
            {
                "id": artwork_id,
                "rank": int(item.get("rank") or len(picks) + 1),
                "title": str(item.get("title") or "Untitled"),
                "artist": str(item.get("user_name") or "Unknown creator"),
                "artist_id": artist_id,
                "artwork_url": f"https://www.pixiv.net/artworks/{artwork_id}",
                "artist_url": f"https://www.pixiv.net/users/{artist_id}",
                "image_url": proxy_image_url(image_url),
                "width": int(item.get("width") or 0),
                "height": int(item.get("height") or 0),
                "page_count": int(item.get("illust_page_count") or 1),
                "is_original": bool(content.get("original")),
            }
        )
        if len(picks) >= ITEM_LIMIT:
            break

    if not picks:
        raise RuntimeError("Pixiv ranking returned no displayable illustrations")

    ranking_date = str(data.get("date") or "")
    if not ranking_date:
        ranking_date = str((data.get("contents") or [{}])[0].get("date") or "").split(" ")[0]
    if len(ranking_date) == 8 and ranking_date.isdigit():
        ranking_date = f"{ranking_date[:4]}-{ranking_date[4:6]}-{ranking_date[6:]}"

    return {
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "ranking_date": ranking_date,
        "mode": RANKING_MODE,
        "source_url": RANKING_PAGE,
        "image_proxy": IMAGE_PROXY,
        "items": picks,
    }


def write_payload(payload: dict) -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    with tempfile.NamedTemporaryFile(
        "w",
        encoding="utf-8",
        dir=Path(__file__).resolve().parent,
        prefix=".pixiv-picks-",
        suffix=".tmp",
        delete=False,
    ) as handle:
        handle.write(serialized)
        temporary_path = Path(handle.name)
    temporary_path.replace(OUTPUT_PATH)


def has_cached_items() -> bool:
    try:
        cached = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return False
    return bool(cached.get("items"))


def main() -> int:
    try:
        payload = build_payload(fetch_ranking())
        write_payload(payload)
    except Exception as error:  # Keep the last successful snapshot when Pixiv is unavailable.
        if has_cached_items():
            print(f"Pixiv update skipped; using cached picks: {error}", file=sys.stderr)
            return 0
        print(f"Pixiv update failed and no cache is available: {error}", file=sys.stderr)
        return 1

    print(f"Updated {len(payload['items'])} Pixiv picks for {payload['ranking_date']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
