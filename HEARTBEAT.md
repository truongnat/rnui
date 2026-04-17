# HEARTBEAT.md

## 📋 Auto-save Reports

Khi nhận kết quả từ các cron jobs sau, **tự động lưu vào `reports/`**:

### 1. Daily Tech News

- File: `reports/tech-news/YYYY-MM-DD.md`
- Cập nhật: `reports/tech-news/INDEX.md` (thêm row mới vào bảng)
- Format: Giữ nguyên sections (Software, AI, Cloud, Security, Mobile, Hot Pick)

### 2. 100 Days Architect

- File: `reports/100days-architect/day-NNN.md` (NNN = số ngày, 3 chữ số)
- Cập nhật: `reports/100days-architect/INDEX.md`
- Format: Đầy đủ lý thuyết + code + bài tập + resources + insight

### 3. 100 Days Leader

- File: `reports/100days-leader/day-NNN.md`
- Cập nhật: `reports/100days-leader/INDEX.md`
- Format: Đầy đủ concepts + templates + resources + insight

**Sau khi lưu file**: commit changes với message `chore(reports): add [type] YYYY-MM-DD`

---

Nếu không có gì cần làm, reply HEARTBEAT_OK.
