# RNUI Example (Expo)

## Lỗi “React Native version mismatch” (JS 0.84.x vs Native 0.83.x)

Dự án có thư mục `ios/` riêng (dev build), **không chạy đúng với Expo Go** nếu phiên bản native không khớp.

1. **Luôn chạy app native đã build:** `bunx expo run:ios` (hoặc mở Xcode → build **RNUIExample**).
2. **Metro:** `bun run start` — script dùng `expo start --dev-client` để không ép mở Expo Go.
3. Nếu vẫn lệch: gỡ app **RNUI Example** trên simulator → xóa `ios/build` → cài pod → build lại:

```bash
cd apps/example
bun install
rm -rf ios/build
cd ios && pod install && cd ..
bunx expo run:ios
```

4. Cách mạnh (tạo lại `ios/`): `bun run ios:fresh` (ghi đè native; chỉ dùng khi bước 3 không hết).

Sau đó mở lại Metro (`bun run start`) và reload app dev client (⌘R).
