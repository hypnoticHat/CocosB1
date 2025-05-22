## Auto Atlas
Auto Atlas là một tính năng của Cocos Creator cho phép bạn gộp nhiều ảnh nhỏ (sprite frames) vào một ảnh lớn duy nhất (atlas) trong quá trình build.
Giúp giảm số lượng texture cần load và chuyển đổi, từ đó:
- Giảm draw call (lệnh vẽ GPU)
- Tăng hiệu suất game
- Tăng tốc độ tải

Các tuỳ chọn:
Max Size(Width/Height): Kích thước tối đa của atlas (ví dụ: 512, 1024, 2048, 4096...)
Padding: Khoản cách giữa các sprite trong atlas
Allow Rotation: Cho phép xoay ảnh để tiết kiệm không gian
Force Squared: Buộc texture atlas cuối cùng phải có tỷ lệ vuông 
Power of Two: Bắt atlas có kích thước là lũy thừa của 2 (128, 256, 512, 1024, 2048...)
Heuristics: cách engine sắp xếp ảnh vào atlas để tối ưu không gian.
Padding Bleed: Sau khi ảnh được đưa vào atlas, Padding Bleed sẽ sao chép và làm mờ viền ngoài của ảnh, để tránh lỗi khi filtering.
Filter Unused Resources: Chỉ đưa vào atlas những sprite thực sự đang được sử dụng trong dự án.


# tại sao giới hạn max witdh/heigh là 2048?
- Tương thích phần cứng GPU:
Rất nhiều thiết bị di động cũ hoặc yếu không hỗ trợ texture lớn hơn 2048x2048.
Nếu bạn build cho Android hoặc Web, nên dùng tối đa 2048 để đảm bảo chạy ổn định.
- Hiệu năng và bộ nhớ:
Texture quá lớn sẽ chiếm nhiều bộ nhớ GPU, dễ gây giật lag hoặc crash trên thiết bị yếu.
- Đảm bảo load nhanh hơn:
Nhiều texture nhỏ gộp vào atlas 2048x2048 là mức cân bằng tốt giữa chất lượng và tốc độ load.