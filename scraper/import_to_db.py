#!/usr/bin/env python3
"""
Import truyện từ JSON vào PostgreSQL (Neon)
Schema: stories + chapters
"""

import json
import os
import glob
import psycopg2
from psycopg2.extras import execute_values
import sys

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://neondb_owner:npg_9rNiMU1wHDSm@ep-crimson-forest-an1ztsk9-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)

CREATE_STORIES_TABLE = """
CREATE TABLE IF NOT EXISTS stories (
    id          SERIAL PRIMARY KEY,
    slug        VARCHAR(255) UNIQUE NOT NULL,
    title       TEXT NOT NULL,
    author      TEXT,
    genres      TEXT[],
    status      VARCHAR(100),
    description TEXT,
    cover_image TEXT,
    source_url  TEXT,
    total_chapters_approx INT,
    chapter_count_scraped INT,
    scraped_at  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
"""

CREATE_CHAPTERS_TABLE = """
CREATE TABLE IF NOT EXISTS chapters (
    id          SERIAL PRIMARY KEY,
    story_id    INT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    number      INT NOT NULL,
    slug        VARCHAR(255),
    title       TEXT,
    content     TEXT,
    word_count  INT,
    source_url  TEXT,
    UNIQUE (story_id, number)
);
"""

CREATE_INDEXES = """
CREATE INDEX IF NOT EXISTS idx_chapters_story_id ON chapters(story_id);
CREATE INDEX IF NOT EXISTS idx_chapters_number ON chapters(story_id, number);
CREATE INDEX IF NOT EXISTS idx_stories_slug ON stories(slug);
"""


def get_conn():
    return psycopg2.connect(DATABASE_URL)


def setup_schema(conn):
    with conn.cursor() as cur:
        cur.execute(CREATE_STORIES_TABLE)
        cur.execute(CREATE_CHAPTERS_TABLE)
        cur.execute(CREATE_INDEXES)
    conn.commit()
    print("✓ Schema đã sẵn sàng")


def import_story(conn, data):
    slug = data["slug"]
    print(f"\n[*] Import: {data['title']} ({slug})")

    with conn.cursor() as cur:
        # Upsert story
        cur.execute("""
            INSERT INTO stories (slug, title, author, genres, status, description, cover_image,
                                 source_url, total_chapters_approx, chapter_count_scraped, scraped_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                author = EXCLUDED.author,
                genres = EXCLUDED.genres,
                status = EXCLUDED.status,
                description = EXCLUDED.description,
                cover_image = EXCLUDED.cover_image,
                total_chapters_approx = EXCLUDED.total_chapters_approx,
                chapter_count_scraped = EXCLUDED.chapter_count_scraped,
                scraped_at = EXCLUDED.scraped_at
            RETURNING id
        """, (
            slug,
            data.get("title", ""),
            data.get("author", ""),
            data.get("genres", []),
            data.get("status", ""),
            data.get("description", ""),
            data.get("cover_image", ""),
            data.get("url", ""),
            data.get("total_chapters_approx"),
            data.get("chapter_count_scraped", 0),
            data.get("scraped_at"),
        ))
        story_id = cur.fetchone()[0]
        print(f"  ✓ Story ID: {story_id}")

        # Insert chapters in batch
        chapters = data.get("chapters", [])
        if chapters:
            rows = [
                (
                    story_id,
                    ch["number"],
                    ch.get("slug", ""),
                    ch.get("title", ""),
                    ch.get("content", ""),
                    ch.get("word_count", 0),
                    ch.get("url", ""),
                )
                for ch in chapters
            ]
            execute_values(cur, """
                INSERT INTO chapters (story_id, number, slug, title, content, word_count, source_url)
                VALUES %s
                ON CONFLICT (story_id, number) DO UPDATE SET
                    title = EXCLUDED.title,
                    content = EXCLUDED.content,
                    word_count = EXCLUDED.word_count
            """, rows)
            print(f"  ✓ Đã import {len(chapters)} chương")

    conn.commit()


def main():
    input_dir = sys.argv[1] if len(sys.argv) > 1 else "output"
    json_files = sorted(glob.glob(os.path.join(input_dir, "*.json")))
    # Exclude index.json
    json_files = [f for f in json_files if os.path.basename(f) != "index.json"]

    if not json_files:
        print(f"Không tìm thấy file JSON trong {input_dir}/")
        sys.exit(1)

    print(f"=== Import {len(json_files)} file vào DB ===")
    conn = get_conn()
    setup_schema(conn)

    success = 0
    for filepath in json_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            import_story(conn, data)
            success += 1
        except Exception as e:
            print(f"  [!] Lỗi {filepath}: {e}")

    conn.close()
    print(f"\n=== Hoàn tất! Import {success}/{len(json_files)} truyện ===")


if __name__ == "__main__":
    main()
