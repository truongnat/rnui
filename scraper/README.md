# TruyenFull Scraper

Cào 10 bộ truyện từ **truyenfull.vn**, lưu JSON, import vào PostgreSQL (Neon).

## Cài đặt

```bash
cd scraper
pip install -r requirements.txt
```

## Sử dụng

### Bước 1: Cào truyện

```bash
# Cào mỗi bộ tối đa 50 chương (mặc định)
python scrape_truyenfull.py

# Hoặc chỉ định số chương tối đa
python scrape_truyenfull.py 100
```

Output: thư mục `output/` chứa:
- `{slug}.json` — mỗi bộ truyện 1 file
- `index.json` — danh sách tổng hợp

### Bước 2: Import vào DB

```bash
python import_to_db.py

# Hoặc chỉ định thư mục khác
python import_to_db.py /path/to/output
```

## Cấu trúc JSON

```json
{
  "slug": "tien-nghich",
  "title": "Tiên Nghịch",
  "author": "Nhĩ Căn",
  "genres": ["Tiên Hiệp", "Huyền Huyễn"],
  "status": "Hoàn thành",
  "description": "...",
  "cover_image": "https://...",
  "url": "https://truyenfull.vn/tien-nghich/",
  "total_chapters_approx": 2000,
  "chapter_count_scraped": 50,
  "scraped_at": "2024-01-01T00:00:00",
  "chapters": [
    {
      "number": 1,
      "title": "Chương 1: ...",
      "slug": "chuong-1",
      "url": "https://...",
      "content": "Nội dung chương...",
      "word_count": 1234
    }
  ]
}
```

## DB Schema

```sql
stories (id, slug, title, author, genres[], status, description, cover_image, source_url, ...)
chapters (id, story_id, number, slug, title, content, word_count, source_url)
```

## 10 bộ truyện mặc định

1. Toàn Cầu Cao Thủ Chim Tôi Có Một Tòa Nhà Vô Nghĩa
2. Ta Là Đại Thần Tiên
3. Tu Luyện Bao Năm Tu Thành Thần Lần Cuối
4. Long Vương Truyện
5. Đế Vương Ký
6. Phàm Nhân Tu Tiên Truyện
7. Bất Bại Thần Đế
8. Thần Đạo Đan Đế
9. Võ Thần Thư
10. Tiên Nghịch

> Để đổi danh sách, sửa `TOP_STORIES` trong `scrape_truyenfull.py`
