# Quy trình Publish Package cho RNUI

Tài liệu này hướng dẫn chi tiết các bước để quản lý phiên bản và publish các package (`@rnui/ui`, `@rnui/headless`, `@rnui/tokens`, `@rnui/themes`) lên NPM hoặc Package Manager khác sử dụng **Changesets**, **Turbo** và **Bun**.

## 1. Yêu cầu tiên quyết (Prerequisites)

- **Tài khoản NPM:** Bạn cần có quyền truy cập vào tổ chức `@rnui` trên [npmjs.com](https://www.npmjs.com/).
- **GitHub Secrets:** Trong repository trên GitHub, hãy đảm bảo đã cấu hình các Secrets sau (Settings > Secrets and variables > Actions):
  - `NPM_TOKEN`: Token của NPM có quyền publish (loại `Automation`).
- **Git Branch:** Nhánh chính của dự án hiện tại là `master`.

---

## 2. Các bước thực hiện

### Bước 1: Tạo bản ghi thay đổi (Changeset)
Mỗi khi bạn thực hiện thay đổi mã nguồn (tính năng mới, sửa lỗi, refactor) mà cần được phát hành, bạn phải tạo một file changeset.

```bash
bun changeset
```
1. **Chọn Package:** Dùng phím mũi tên và **Dấu cách** để chọn các package đã thay đổi, sau đó nhấn **Enter**.
2. **Chọn loại thay đổi:**
   - `major`: Thay đổi lớn, phá vỡ tính tương thích (breaking change).
   - `minor`: Thêm tính năng mới, vẫn tương thích ngược.
   - `patch`: Sửa lỗi nhỏ, không thay đổi API.
3. **Mô tả thay đổi:** Viết một dòng ngắn gọn về những gì bạn đã làm. Nội dung này sẽ tự động xuất hiện trong file `CHANGELOG.md`.

*Lưu ý: Sau khi chạy xong, một file `.changeset/*.md` sẽ được tạo. Bạn cần **commit và push** file này lên GitHub cùng với code của bạn.*

### Bước 2: Chốt phiên bản (Versioning)
Sau khi các thay đổi được merge vào nhánh `master`, bạn cần cập nhật phiên bản cho các package.

```bash
bun run version-packages
```
Lệnh này sẽ:
- Đọc tất cả các file changeset hiện có.
- Tự động tăng số version trong `package.json` của từng package.
- Cập nhật file `CHANGELOG.md` cho mỗi package.
- Xóa các file changeset đã xử lý.

*Sau bước này, bạn nên commit với message kiểu `chore: release packages`.*

### Bước 3: Phát hành (Publishing)

#### Cách 1: Tự động qua CI (Khuyên dùng)
Dự án đã được cấu hình GitHub Action (`.github/workflows/ci.yml`). Khi bạn push commit có thay đổi version lên nhánh `master`, hệ thống sẽ tự động:
1. Chạy Build và Test.
2. Nếu thành công, nó sẽ tự động chạy `changeset publish` để đẩy các package lên NPM.
3. Tạo GitHub Release tương ứng với các thay đổi.

#### Cách 2: Publish thủ công từ máy cá nhân
Nếu bạn muốn tự publish, hãy đảm bảo đã đăng nhập NPM (`npm login`) và chạy lệnh:

```bash
bun run release
```
Lệnh này tương đương với: `turbo build && changeset publish`.

---

## 3. Các lệnh quan trọng

| Lệnh | Tác dụng |
| :--- | :--- |
| `bun changeset` | Tạo file ghi nhận thay đổi (Dùng trong quá trình dev) |
| `bun run version-packages` | Cập nhật version và CHANGELOG (Dùng trước khi release) |
| `bun run release` | Build toàn bộ và đẩy lên NPM |
| `bun changeset status` | Xem các thay đổi hiện tại chưa được version |

## 4. Lưu ý về cấu hình
File cấu hình chính nằm tại `.changeset/config.json`:
- `access`: Mặc định là `public` để mọi người có thể cài đặt.
- `baseBranch`: Hiện tại là `master`.
- `updateInternalDependencies`: Đang để là `patch` (tự động cập nhật version của các package nội bộ khi package phụ thuộc thay đổi).
