#!/usr/bin/env python3
"""
Scraper cho truyenfull.vn
Cào 10 bộ truyện, lưu ra JSON để import vào DB
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re
import sys
from datetime import datetime

BASE_URL = "https://truyenfull.vn"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
    "Referer": BASE_URL,
}
OUTPUT_DIR = "output"
DELAY_BETWEEN_REQUESTS = 1.5  # seconds

# 10 bộ truyện nổi tiếng trên truyenfull
TOP_STORIES = [
    "toan-cau-cao-thiem-chim-toi-co-mot-toa-nha-vo-nghia",
    "ta-la-dai-than-tien",
    "tu-luyen-bao-nam-tu-thanh-than-lan-cuoi",
    "long-vuong-truyen",
    "de-vuong-ky",
    "pham-nhan-tu-tien-truyen",
    "bat-bai-than-de",
    "than-dao-dan-de",
    "vo-than-thu",
    "tien-nghich",
]


def slugify(text):
    """Tạo slug từ text"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text


def get_soup(url, retries=3):
    """Fetch URL và trả về BeautifulSoup object"""
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            resp.raise_for_status()
            resp.encoding = 'utf-8'
            return BeautifulSoup(resp.text, 'html.parser')
        except Exception as e:
            print(f"  [!] Lỗi fetch {url}: {e} (attempt {attempt+1}/{retries})")
            if attempt < retries - 1:
                time.sleep(3)
    return None


def get_story_info(story_slug):
    """Lấy thông tin cơ bản của truyện"""
    url = f"{BASE_URL}/{story_slug}/"
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
    title_tag = soup.select_one("h3.title")
    if not title_tag:
        title_tag = soup.select_one("h1")
    info["title"] = title_tag.get_text(strip=True) if title_tag else story_slug

    # Author
    author_tag = soup.select_one("div.info a[href*='tac-gia']")
    if not author_tag:
        author_tag = soup.select_one("div.info-holder a[href*='tac-gia']")
    info["author"] = author_tag.get_text(strip=True) if author_tag else "Không rõ"

    # Genres
    genre_tags = soup.select("div.info a[href*='the-loai']")
    info["genres"] = [g.get_text(strip=True) for g in genre_tags]

    # Status
    status_tag = soup.select_one("span.text-success, span.text-primary")
    info["status"] = status_tag.get_text(strip=True) if status_tag else "Không rõ"

    # Description
    desc_tag = soup.select_one("div.desc-text")
    if not desc_tag:
        desc_tag = soup.select_one("div.story-detail-info")
    info["description"] = desc_tag.get_text(strip=True) if desc_tag else ""

    # Cover image
    img_tag = soup.select_one("div.book img")
    info["cover_image"] = img_tag.get("src", "") if img_tag else ""

    # Total chapters count (from listing)
    chapters_count_tag = soup.select_one("a[title*='Chương cuối']")
    info["total_chapters_approx"] = None
    if chapters_count_tag:
        m = re.search(r'(\d+)', chapters_count_tag.get_text())
        if m:
            info["total_chapters_approx"] = int(m.group(1))

    return info


def get_chapter_list(story_slug, max_chapters=50):
    """Lấy danh sách chương (tối đa max_chapters chương đầu)"""
    chapters = []
    page = 1
    while True:
        if page == 1:
            url = f"{BASE_URL}/{story_slug}/"
        else:
            url = f"{BASE_URL}/{story_slug}/trang-{page}/"
        
        print(f"    → Trang chương {page}: {url}")
        soup = get_soup(url)
        if not soup:
            break

        chapter_tags = soup.select("ul.list-chapter li a")
        if not chapter_tags:
            break

        for tag in chapter_tags:
            href = tag.get("href", "")
            title = tag.get_text(strip=True)
            # Extract chapter number
            m = re.search(r'chuong-(\d+)', href)
            chap_num = int(m.group(1)) if m else len(chapters) + 1
            chapters.append({
                "number": chap_num,
                "title": title,
                "url": href,
                "slug": href.rstrip('/').split('/')[-1],
            })
            if len(chapters) >= max_chapters:
                break

        if len(chapters) >= max_chapters:
            break

        # Check next page
        next_btn = soup.select_one("ul.pagination li.active + li a")
        if not next_btn:
            break
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)

    return chapters


def get_chapter_content(chapter_url):
    """Lấy nội dung một chương"""
    soup = get_soup(chapter_url)
    if not soup:
        return ""

    content_div = soup.select_one("div#chapter-c")
    if not content_div:
        content_div = soup.select_one("div.chapter-c")
    if not content_div:
        content_div = soup.select_one("div.box-chap")

    if not content_div:
        return ""

    # Clean ads and junk
    for tag in content_div.select("script, .ads, .quảng-cáo, [class*='ads']"):
        tag.decompose()

    # Get paragraphs
    paragraphs = []
    for p in content_div.find_all(['p', 'div'], recursive=False):
        text = p.get_text(separator='\n', strip=True)
        if text:
            paragraphs.append(text)

    if not paragraphs:
        paragraphs = [content_div.get_text(separator='\n', strip=True)]

    return '\n\n'.join(paragraphs)


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

    # Get chapter list
    print(f"  → Lấy danh sách chương (tối đa {max_chapters})...")
    chapters_meta = get_chapter_list(story_slug, max_chapters=max_chapters)
    print(f"  ✓ Tìm được {len(chapters_meta)} chương")
    time.sleep(DELAY_BETWEEN_REQUESTS)

    # Get chapter contents
    chapters = []
    for i, chap in enumerate(chapters_meta):
        print(f"    [{i+1}/{len(chapters_meta)}] Chương {chap['number']}: {chap['title'][:50]}")
        content = get_chapter_content(chap["url"])
        chapters.append({
            **chap,
            "content": content,
            "word_count": len(content.split()) if content else 0,
        })
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
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(story, f, ensure_ascii=False, indent=2)
    size_kb = os.path.getsize(filepath) / 1024
    print(f"  ✓ Đã lưu: {filepath} ({size_kb:.1f} KB)")
    return filepath


def save_index(stories_index, output_dir):
    """Lưu file index tổng hợp"""
    filepath = os.path.join(output_dir, "index.json")
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(stories_index, f, ensure_ascii=False, indent=2)
    print(f"\n✓ Index: {filepath}")


def main():
    max_chapters = 50
    if len(sys.argv) > 1:
        try:
            max_chapters = int(sys.argv[1])
        except ValueError:
            pass

    print(f"=== TruyenFull Scraper ===")
    print(f"Sẽ cào {len(TOP_STORIES)} bộ truyện, mỗi bộ tối đa {max_chapters} chương")
    print(f"Output: {os.path.abspath(OUTPUT_DIR)}\n")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    stories_index = []

    for slug in TOP_STORIES:
        try:
            story = scrape_story(slug, max_chapters=max_chapters)
            if story:
                filepath = save_story(story, OUTPUT_DIR)
                stories_index.append({
                    "slug": story["slug"],
                    "title": story["title"],
                    "author": story["author"],
                    "genres": story["genres"],
                    "status": story["status"],
                    "chapter_count_scraped": story["chapter_count_scraped"],
                    "total_chapters_approx": story.get("total_chapters_approx"),
                    "file": filepath,
                })
        except Exception as e:
            print(f"  [!] Lỗi khi cào {slug}: {e}")

    save_index(stories_index, OUTPUT_DIR)
    print(f"\n=== Hoàn tất! Đã cào {len(stories_index)}/{len(TOP_STORIES)} bộ truyện ===")


if __name__ == "__main__":
    main()
