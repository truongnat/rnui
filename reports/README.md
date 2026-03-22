# 📁 Reports

Thư mục lưu trữ các report định kỳ dưới dạng Markdown, dễ export.

## Cấu trúc

```
reports/
├── tech-news/
│   ├── INDEX.md              # Danh sách tất cả entries (export-ready)
│   └── YYYY-MM-DD.md         # Report theo ngày
├── 100days-architect/
│   ├── INDEX.md              # Danh sách tất cả entries
│   └── day-NNN.md            # Mỗi ngày 1 file
└── 100days-leader/
    ├── INDEX.md
    └── day-NNN.md
```

## Export

Để export toàn bộ một loại report:
```bash
cat reports/tech-news/INDEX.md          # Xem danh sách
cat reports/tech-news/*.md              # Toàn bộ nội dung
cat reports/100days-architect/INDEX.md  # 100 Days Architect
cat reports/100days-leader/INDEX.md     # 100 Days Leader
```

Hoặc merge thành 1 file:
```bash
cat reports/tech-news/*.md > export-tech-news.md
cat reports/100days-architect/*.md > export-architect.md
cat reports/100days-leader/*.md > export-leader.md
```
