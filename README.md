# TOPIK I — Lộ Trình 8 Tuần Tự Học Tiếng Hàn (8-Week Study App)

Ứng dụng web toàn diện dành cho người mới bắt đầu học tiếng Hàn tại Việt Nam, chuẩn bị cho kỳ thi năng lực tiếng Hàn **TOPIK I (Cấp độ 1 & Cấp độ 2)** trong vòng 8 tuần.

---

## 🌟 Tính Năng Nổi Bật

1. **Tổng quan (Dashboard thông minh):**
   - Tính toán tỷ lệ tiến độ dựa trên dữ liệu thật lưu trong `LocalStorage`, không sử dụng số liệu ảo.
   - Theo dõi mục tiêu học tập 120 phút mỗi ngày kèm đồng hồ bấm giờ học trực tiếp và nút ghi nhanh (+15p, +30p).
   - Bộ đếm chuỗi ngày học liên tục (Study Streak).
   - Danh sách nhiệm vụ học tập tự động cập nhật theo tuần học hiện tại.

2. **Lộ trình học 8 tuần (8-Week Roadmap):**
   - **Tuần 1:** Bảng chữ cái Hangul, ghép vần, 7 nhóm patchim và quy tắc nối âm.
   - **Tuần 2:** Cấu trúc câu S-O-V, tiểu từ `은/는` & `이/가`, đuôi câu `-ㅂ니다/습니다` & `-아/어요`, số đếm Thuần Hàn và Hán Hàn.
   - **Tuần 3:** Sinh hoạt hàng ngày, món ăn, mua sắm, tiểu từ tân ngữ `을/를`, nơi chốn `에/에서`, thì quá khứ `-았/었어요`.
   - **Tuần 4:** Giao thông, thời tiết, thì tương lai `-(으)ㄹ 거예요`, khả năng `-(으)ㄹ 수 있다/없다`, liên từ `-고`, `-지만`, `-아서/어서`.
   - **Tuần 5:** Luyện giải dạng đề nghe & đọc cơ bản (biển báo, thông báo, câu hỏi - đáp ngắn).
   - **Tuần 6:** Luyện kỹ năng đọc hiểu & nghe hiểu tình huống thực tế, xác định hành động tiếp theo.
   - **Tuần 7:** Luyện đề bấm giờ, phân bổ thời gian và phân tích bẫy thi TOPIK I.
   - **Tuần 8:** Tổng ôn lỗi sai, rà soát 100 từ vựng cốt lõi, tâm lý phòng thi và về đích Level 2 (140+ điểm).

3. **Từ vựng Flashcard (단어장):**
   - Bộ từ vựng sơ cấp được chọn lọc kỹ lưỡng theo các chủ đề thiết yếu: Chào hỏi, Số đếm - Thời gian, Gia đình, Đồ ăn, Mua sắm, Giao thông, Thời tiết, Trường học.
   - Chế độ lật thẻ 3D trực quan, hỗ trợ phím tắt (`Phím cách` để lật, `Phím 1` đánh dấu cần ôn, `Phím 2` đánh dấu đã thuộc).
   - Phát âm tiếng Hàn giọng chuẩn thông qua công nghệ Web Speech API (`ko-KR`) kèm thông báo rõ ràng về trạng thái hỗ trợ âm thanh của trình duyệt.
   - Chế độ danh sách từ vựng tra cứu nhanh, tìm kiếm song ngữ Hàn - Việt.

4. **Bài giảng ngữ pháp & Trắc nghiệm củng cố (문법):**
   - Các điểm ngữ pháp nền tảng TOPIK I kèm công thức ghép có patchim / không patchim.
   - Ví dụ câu thực tế có thể phát âm tiếng Hàn.
   - Hộp cảnh báo bẫy thi và lỗi người Việt hay gặp.
   - Bài tập trắc nghiệm củng cố kèm lời giải thích chi tiết ngay lập tức; câu làm sai tự động lưu vào Sổ tay lỗi sai.

5. **Luyện nghe & Luyện đọc (듣기 & 읽기):**
   - Dạng câu hỏi mô phỏng đề thi TOPIK I chuẩn: Biển báo thông báo thực tế, điền từ vào chỗ trống, nghe phản hồi câu thoại, tìm địa điểm giao dịch.
   - Trình phát âm thanh có điều chỉnh tốc độ (0.85x cho người mới bắt đầu, 1.0x tốc độ chuẩn) và tùy chọn ẩn/hiện lời thoại (Transcript).
   - Lời giải thích cặn kẽ tại sao đáp án đúng là chính xác.

6. **Sổ tay lỗi sai (오답 노트 - Error Notebook):**
   - Tự động ghi lại mọi câu hỏi làm sai ở tất cả các phần.
   - Cho phép người học luyện tập lại trực tiếp cho đến khi trả lời đúng 100%.
   - Tùy chọn gỡ câu hỏi khỏi sổ tay khi đã thành thạo.

7. **Thống kê & Quản lý dữ liệu:**
   - Biểu đồ hoàn thành theo từng tuần học.
   - Tính năng sao lưu (Export JSON) và khôi phục (Import JSON) để không lo mất dữ liệu học tập.
   - Tính năng đặt lại tiến độ (Reset) an toàn với bước xác thực nhập từ khóa "RESET".

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Audio Engine:** Web Speech API (SpeechSynthesis with `ko-KR` locale)
- **Lưu trữ dữ liệu:** Trình duyệt Browser LocalStorage (không cần backend/database/API key bên ngoài)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

1. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

2. Khởi chạy máy chủ phát triển (Development Server):
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:3000` (hoặc cổng cấu hình trong Vite).

3. Kiểm tra mã nguồn (Linting):
   ```bash
   npm run lint
   ```

4. Đóng gói triển khai sản phẩm (Production Build):
   ```bash
   npm run build
   ```
   Thư mục đóng gói `dist/` đã sẵn sàng để đưa lên bất kỳ dịch vụ lưu trữ web tĩnh nào.

---

## 🌐 Hướng Dẫn Triển Khai (Deployment)

Ứng dụng là một Single Page Application (SPA) hoàn toàn tĩnh và lưu trữ phía máy khách (Client-side):

- **Vercel / Netlify:** Kết nối kho lưu trữ Git, đặt lệnh build là `npm run build` và thư mục output là `dist`.
- **GitHub Pages:** Có thể xuất bản thư mục `dist` lên nhánh `gh-pages`.
- **Firebase Hosting / Cloudflare Pages:** Đẩy toàn bộ nội dung thư mục `dist`.
- Không cần cấu hình biến môi trường hay cơ sở dữ liệu bên ngoài.
