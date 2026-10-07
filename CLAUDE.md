# Triết lý coding (YC-style)

> Ưu tiên: **chạy được → đúng → nhanh → đẹp**.  
> Rule of Three cho abstraction. Code tự giải thích; comment giải thích *tại sao*.

## Git — không tự commit/push

**Không** tự `git add` / `git commit` / `git push` trừ khi người dùng yêu cầu rõ (ví dụ: "commit đi", "push lên").  
Khi được yêu cầu commit: xem `git diff --stat`, dùng [Conventional Commits](https://www.conventionalcommits.org/), xác nhận nếu mơ hồ.

## Nợ kỹ thuật

Shortcut có chủ đích: `// TODO:` kèm lý do (và khi cần: ngày/owner). Định kỳ trả nợ.

## Trước khi done

- Thay đổi giải quyết đúng vấn đề gốc? Có cách đo/benchmark/log không (khi claim hiệu năng)?
- Người mới đọc có hiểu không? Edge case nào chưa xử lý?

> *"Code là thư gửi cho người trong tương lai — thường là chính bạn."*

Rule Cursor toàn cục: `~/.cursor/rules/yc-engineering-philosophy.mdc`.
