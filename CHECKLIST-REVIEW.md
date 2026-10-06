# Checklist chất lượng component React Native

Dùng checklist này khi xây dựng hoặc review component theo tinh thần shadcn/ui. Đánh dấu các mục phù hợp với component; ghi rõ lý do nếu một trạng thái hoặc yêu cầu không áp dụng.

## Design token và visual system

- [ ] Ưu tiên design token hiện có; không hardcode style tùy hứng.
- [ ] Mọi màu đi qua token/theme và dùng semantic token phù hợp như `background`, `foreground`, `muted`, `border`, `primary`, `destructive`.
- [ ] Không dùng trực tiếp màu như `#fff`, `#000`, hoặc `gray500` khi đã có semantic token.
- [ ] Spacing và radius tuân theo scale chung của project.
- [ ] Typography có hierarchy rõ cho display, heading, body, label và caption.
- [ ] Không thêm font size lẻ khi đã có token; giới hạn số font weight và kiểm soát line-height.
- [ ] Icon dùng cùng một icon system, size theo scale cố định và stroke width đồng nhất.
- [ ] Không trộn nhiều phong cách icon trong cùng app.
- [ ] Dark mode được tính đến từ đầu.

## Trạng thái và độ nhất quán

- [ ] Component có các trạng thái cần thiết: default, pressed, focused, disabled, loading và error khi phù hợp; hỗ trợ hover nếu platform có.
- [ ] Touch target đủ lớn cho mobile; kích thước vùng bấm không bị thu nhỏ theo icon hoặc hình thức hiển thị.
- [ ] Padding nội bộ và khoảng cách giữa icon với text nhất quán.
- [ ] Baseline của text và icon được căn chỉnh.
- [ ] Component cùng loại tuân theo convention chiều cao chung.
- [ ] Border rõ nhưng nhẹ; shadow/elevation dùng theo level thống nhất, không tùy hứng.
- [ ] Card có spacing nội bộ nhất quán và không lạm dụng shadow.

## Variants và API

- [ ] Button có variants rõ ràng: default, secondary, outline, ghost, destructive và link khi cần.
- [ ] Button có sizes theo hệ thống: sm, md, lg và icon.
- [ ] Không tạo variant chỉ để phục vụ một màn hình riêng lẻ.
- [ ] Input nhất quán về height, border, radius, padding, placeholder, focus, disabled và error.
- [ ] Input có icon vẫn giữ alignment chuẩn.
- [ ] Label, helper text và error text có hierarchy rõ.
- [ ] `className` hoặc style override tuân theo convention của project và không phá core behavior.
- [ ] API component nhỏ, dễ đoán; tên prop rõ nghĩa và tránh quá nhiều boolean prop.
- [ ] Khi có nhiều boolean prop, cân nhắc variant/config phù hợp.
- [ ] Dùng variant system nhất quán, chẳng hạn CVA hoặc giải pháp tương đương cho React Native.
- [ ] Không lặp class/style giữa các component; chỉ extract shared primitive khi hợp lý.
- [ ] Tránh abstraction quá sớm và wrapper không mang lại giá trị.
- [ ] Component composable; ưu tiên composition hơn prop explosion và cho phép truyền `children` tự nhiên.
- [ ] Không khóa layout quá cứng nếu không cần.

## Nội dung và khả năng thích ứng layout

- [ ] Layout chịu được text dài; tránh absolute positioning trừ khi thực sự cần.
- [ ] Kiểm tra tiếng Việt, tiếng Anh, text dài, số dài và trạng thái empty.
- [ ] Text không bị clip; icon không đè lên text.
- [ ] Button không co nhỏ bất hợp lý khi nhãn dài.
- [ ] Quyết định `numberOfLines` có chủ đích.
- [ ] Kiểm tra màn hình nhỏ, màn hình lớn và tablet nếu app hỗ trợ.
- [ ] Không đặt `max-width` bất hợp lý trên mobile và không phụ thuộc vào một thiết bị duy nhất.

## Hành vi mobile và hiệu năng

- [ ] Xem xét safe area ở component cấp màn hình.
- [ ] Form tính đến keyboard để keyboard không che input hoặc action.
- [ ] Modal/sheet xử lý keyboard phù hợp; scroll behavior tự nhiên và tránh lồng `ScrollView` không cần thiết.
- [ ] List dài dùng `FlatList`/`FlashList` phù hợp.
- [ ] Tránh re-render không cần thiết; không dùng `memo` hoặc memoize callback nếu không có lý do.
- [ ] Tránh tạo object/style mới trong render khi điều đó gây vấn đề thực tế.

## Motion, loading và lỗi

- [ ] Animation nhẹ, có mục đích; không animate mọi thứ.
- [ ] Press feedback nhanh và rõ; transition không làm UI có cảm giác chậm.
- [ ] Loading không làm layout nhảy mạnh; skeleton gần với layout thật.
- [ ] Empty state rõ ràng nhưng tiết chế.
- [ ] Error state cho người dùng biết bước tiếp theo.

## Accessibility

- [ ] Icon-only button có `accessibilityLabel`.
- [ ] `accessibilityRole` đúng với chức năng của component.
- [ ] `accessibilityState` phản ánh chính xác disabled, selected và checked.
- [ ] Focus order hợp lý.
- [ ] Không dùng màu làm tín hiệu duy nhất; contrast đủ rõ và disabled state vẫn đọc được.
- [ ] Kiểm tra font scaling/accessibility text size; không khóa `fontScale` nếu không có lý do mạnh.

## Tương thích platform và responsive

- [ ] Component hoạt động ổn trên cả iOS và Android; không giả định rendering hai platform giống hệt nhau.
- [ ] Kiểm tra riêng font rendering, shadow/elevation, keyboard behavior và touch feedback Android.
- [ ] Kiểm tra status bar và safe area ở nơi phù hợp.
- [ ] Không phụ thuộc vào pixel-perfect trên một device duy nhất.

## Ví dụ, kiểm thử và hoàn tất review

- [ ] Có ví dụ sử dụng rõ ràng; component phức tạp có story/demo/example.
- [ ] Dùng visual regression test nếu project có hỗ trợ; snapshot test không thay thế behavioral test.
- [ ] Mỗi component được kiểm tra render, interaction, disabled, loading và các variant chính.
- [ ] Form component được kiểm tra validation; interactive component được kiểm tra press/focus/state.
- [ ] Test hành vi người dùng, không chỉ implementation detail.
- [ ] So sánh component với các component cùng nhóm về spacing, typography, radius và icon alignment.
- [ ] Kiểm tra dark mode, iOS, Android, text dài, disabled/loading/error và accessibility.
- [ ] Review diff để loại style hardcode thừa, token trùng lặp, prop/variant không dùng, abstraction vô ích và platform hack không cần thiết.

## Sáu nguyên tắc cốt lõi

1. Token trước, style sau.
2. Primitive ít nhưng chắc.
3. Variant rõ ràng.
4. Spacing, typography và radius đồng bộ.
5. Mọi trạng thái đều được thiết kế.
6. Component nhìn đơn giản nhưng hành vi đầy đủ.

Một component đạt chất lượng khi đặt cạnh các component khác vẫn thuộc cùng một design system.
