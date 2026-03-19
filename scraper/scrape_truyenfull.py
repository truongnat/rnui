#!/usr/bin/env python3
"""
Scraper cho truyenchu.net (WordPress Madara theme)
Cào 10 bộ truyện, lưu ra JSON để import vào DB

Nguồn: truyenchu.net
- URL truyện: https://truyenchu.net/truyen/{slug}/
- Chapter list: POST https://truyenchu.net/truyen/{slug}/ajax/chapters/
- Chapter content: https://truyenchu.net/truyen/{slug}/chuong-{n}/
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re
import sys
from datetime import datetime

BASE_URL = "https://truyenchu.net"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
    "Referer": BASE_URL,
}
OUTPUT_DIR = "output"
DELAY_BETWEEN_REQUESTS = 1.5  # seconds

# 10 bộ truyện đã xác nhận tồn tại trên truyenchu.net
TOP_STORIES = [
    "tien-nghich",           # Tiên Nghịch - Nhĩ Căn
    "pham-nhan-tu-tien",     # Phàm Nhân Tu Tiên
    "long-vuong-truyen",     # Long Vương Truyện
    "vu-luyen-dien-phong",   # Vũ Luyện Điên Phong
    "van-co-chi-ton",        # Vạn Cổ Chi Tôn
    "doc-bo-thien-ha",       # Độc Bộ Thiên Hạ
    "nhat-niem-vinh-hang",   # Nhất Niệm Vĩnh Hằng
    "nga-duc-phong-thien",   # Ngã Độc Phong Thiên
    "chan-tien",             # Chân Tiên
    "tinh-gioi",             # Tinh Giới
]


def get_soup(url, method="GET", retries=3):
    """Fetch URL và trả về BeautifulSoup object"""
    for attempt in range(retries):
        try:
            if method == "POST":
                resp = requests.post(
                    url,
                    headers={**HEADERS, "X-Requested-With": "XMLHttpRequest"},
                    timeout=20,
                )
            else:
                resp = requests.get(url, headers=HEADERS, timeout=15)
            resp.raise_for_status()
            resp.encoding = "utf-8"
            return BeautifulSoup(resp.text, "html.parser")
        except Exception as e:
            print(f"  [!] Lỗi fetch {url}: {e} (attempt {attempt+1}/{retries})")
            if attempt < retries - 1:
                time.sleep(3)
    return None


def get_story_info(story_slug):
    """Lấy thông tin cơ bản của truyện"""
    url = f"{BASE_URL}/truyen/{story_slug}/"
    print(f"  → Lấy info: {url}")
    soup = get_soup(url)
    if not soup:
        return None

    info = {
        "slug": story_slug,
        "url": url,
        "scraped_at": datetime.now().isoformat(),
    }

    # Title
    title_tag = soup.select_one("h1")
    info["title"] = title_tag.get_text(strip=True) if title_tag else story_slug

    # Author
    author_tag = soup.select_one("a[href*='tac-gia'], .author-content a")
    info["author"] = author_tag.get_text(strip=True) if author_tag else "Không rõ"

    # Genres - chỉ lấy trong block thông tin truyện
    genres_container = soup.select_one(".genres-content, .post-content_item .summary-content")
    if genres_container:
        genre_tags = genres_container.select("a")
    else:
        genre_tags = soup.select(".post-content_item a[href*='the-loai']")
    info["genres"] = list(dict.fromkeys(g.get_text(strip=True) for g in genre_tags))

    # Status
    status_tag = soup.select_one(".post-status .summary-content, .manga-status")
    info["status"] = status_tag.get_text(strip=True) if status_tag else "Không rõ"

    # Description
    desc_tag = soup.select_one(".description-summary, .summary__content")
    info["description"] = desc_tag.get_text(strip=True) if desc_tag else ""

    # Cover image
    img_tag = soup.select_one(".summary_image img, .manga-thumbnail img")
    info["cover_image"] = (
        img_tag.get("data-src") or img_tag.get("src", "") if img_tag else ""
    )

    # manga_id từ JS (dùng để debug nếu cần)
    manga_id_match = re.search(r'"manga_id"\s*:\s*"(\d+)"', soup.decode())
    info["source_id"] = manga_id_match.group(1) if manga_id_match else None

    return info


def get_chapter_list(story_slug, max_chapters=50):
    """Lấy danh sách chương qua Madara AJAX endpoint"""
    url = f"{BASE_URL}/truyen/{story_slug}/ajax/chapters/"
    print(f"    → POST {url}")
    soup = get_soup(url, method="POST")
    if not soup:
        return []

    chapter_tags = soup.select("li.wp-manga-chapter a")
    # Chapters được trả về theo thứ tự mới nhất → đảo ngược để có thứ tự đúng
    chapter_tags = list(reversed(chapter_tags))

    chapters_meta = []
    for tag in chapter_tags[:max_chapters]:
        href = tag.get("href", "")
        title = tag.get_text(strip=True)
        # Extract chapter number từ URL: /chuong-123/
        m = re.search(r"chuong-(\d+)", href)
        chap_num = int(m.group(1)) if m else len(chapters_meta) + 1
        chapters_meta.append(
            {
                "number": chap_num,
                "title": title,
                "url": href,
                "slug": href.rstrip("/").split("/")[-1],
            }
        )

    return chapters_meta


def get_chapter_content(chapter_url):
    """Lấy nội dung một chương"""
    soup = get_soup(chapter_url)
    if not soup:
        return ""

    content_div = soup.select_one(".read-container .entry-content, .reading-content, .read-container")
    if not content_div:
        return ""

    # Xóa ads và script
    for tag in content_div.select("script, style, .ads, [class*='ads'], .adsbox"):
        tag.decompose()

    # Lấy text theo đoạn
    text = content_div.get_text(separator="\n", strip=True)
    # Clean multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def scrape_story(story_slug, max_chapters=50):
    """Cào toàn bộ thông tin một bộ truyện"""
    print(f"\n[*] Đang cào: {story_slug}")

    # Get basic info
    info = get_story_info(story_slug)
    if not info:
        print(f"  [!] Không lấy được info cho {story_slug}")
        return None
    print(f"  ✓ Tên: {info['title']} | Tác giả: {info['author']}")
    time.sleep(DELAY_BETWEEN_REQUESTS)

    # Get chapter list via AJAX
    print(f"  → Lấy danh sách chương (tối đa {max_chapters})...")
    chapters_meta = get_chapter_list(story_slug, max_chapters=max_chapters)
    print(f"  ✓ Tìm được {len(chapters_meta)} chương")
    time.sleep(DELAY_BETWEEN_REQUESTS)

    # Get chapter contents
    chapters = []
    for i, chap in enumerate(chapters_meta):
        print(
            f"    [{i+1}/{len(chapters_meta)}] Chương {chap['number']}: {chap['title'][:50]}"
        )
        content = get_chapter_content(chap["url"])
        chapters.append(
            {
                **chap,
                "content": content,
                "word_count": len(content.split()) if content else 0,
            }
        )
        time.sleep(DELAY_BETWEEN_REQUESTS)

    story = {
        **info,
        "chapter_count_scraped": len(chapters),
        "chapters": chapters,
    }
    return story


def save_story(story, output_dir):
    """Lưu truyện ra file JSON"""
    os.makedirs(output_dir, exist_ok=True)
    filename = f"{story['slug']}.json"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(story, f, ensure_ascii=False, indent=2)
    size_kb = os.path.getsize(filepath) / 1024
    print(f"  ✓ Đã lưu: {filepath} ({size_kb:.1f} KB)")
    return filepath


def save_index(stories_index, output_dir):
    """Lưu file index tổng hợp"""
    filepath = os.path.join(output_dir, "index.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(stories_index, f, ensure_ascii=False, indent=2)
    print(f"\n✓ Index: {filepath}")


def main():
    max_chapters = 50
    if len(sys.argv) > 1:
        try:
            max_chapters = int(sys.argv[1])
        except ValueError:
            pass

    print(f"=== TruyenChu.net Scraper ===")
    print(f"Nguồn: {BASE_URL}")
    print(f"Sẽ cào {len(TOP_STORIES)} bộ truyện, mỗi bộ tối đa {max_chapters} chương")
    print(f"Output: {os.path.abspath(OUTPUT_DIR)}\n")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    stories_index = []

    for slug in TOP_STORIES:
        try:
            story = scrape_story(slug, max_chapters=max_chapters)
            if story:
                filepath = save_story(story, OUTPUT_DIR)
                stories_index.append(
                    {
                        "slug": story["slug"],
                        "title": story["title"],
                        "author": story["author"],
                        "genres": story["genres"],
                        "status": story["status"],
                        "chapter_count_scraped": story["chapter_count_scraped"],
                        "file": filepath,
                    }
                )
        except Exception as e:
            print(f"  [!] Lỗi khi cào {slug}: {e}")

    save_index(stories_index, OUTPUT_DIR)
    print(
        f"\n=== Hoàn tất! Đã cào {len(stories_index)}/{len(TOP_STORIES)} bộ truyện ==="
    )


if __name__ == "__main__":
    main()
