




## Wrap Mode
Thông thường, tọa độ UV (tức là tọa độ kết cấu dùng để ánh xạ hình ảnh lên bề mặt vật thể) có giá trị nằm trong khoảng [0, 1].
Tuy nhiên, khi tọa độ UV vượt quá khoảng [0, 1], hệ thống sẽ xử lý phần vượt đó bằng chế độ Wrap Mode (chế độ lặp hoặc kẹp của texture). Cocos ó hai chế độ wrap chính:

1. Clamp mode:
- Giới hạn (chặn) giá trị tọa độ UV trong khoảng từ 0 đến 1.
- Texture chỉ được vẽ một lần duy nhất, không lặp lại.
- Những phần vượt ra ngoài sẽ lấy giá trị pixel ở viền gần nhất của texture và kéo giãn ra.
- Ứng dụng: Dùng cho ảnh nền, UI, hoặc vật thể không muốn lặp texture.
  + Giúp tránh viền đen/trắng ở rìa khi dùng alpha.
2. Repeat Mode
- Cho phép tọa độ UV vượt quá [0, 1].
- Texture sẽ được lặp lại liên tục, sử dụng phần từ [0, 1] như một mẫu nền.
- Ứng dụng: Dùng cho sàn nhà, tường gạch, bề mặt có hoa văn lặp. Phổ biến trong shader, tilemap, hoặc hiệu ứng đặc biệt.

## Filter Mode
Khi kích thước texture gốc không khớp với kích thước hiển thị trên màn hình, engine sẽ sử dụng các chế độ lọc (filter modes) để xác định màu của từng pixel được hiển thị từ texture.

1. Point Filtering 
Chỉ lấy màu của texel (pixel trong texture) gần nhất với tâm của pixel màn hình.
Ưu điểm: Tính toán nhanh, đơn giản, nhẹ hiệu năng.
Nhược điểm:
Khi phóng to texture: ảnh sẽ bị vỡ ô, răng cưa.
Khi thu nhỏ texture: gây ra nhấp nháy, mất chi tiết.

2. Bilinear Filtering
Lấy 4 texel gần nhất, sau đó nội suy (interpolate) màu dựa trên khoảng cách đến tâm pixel màn hình.
Kết quả là màu sắc mượt hơn, chuyển tiếp nhẹ nhàng giữa các texel.
Tính toán nặng hơn một chút so với lọc điểm.

3. Trilinear Filtering
Dựa trên Bilinear filtering, nhưng thực hiện trên 2 mức mipmap gần nhất:
Một mức mipmap chi tiết hơn.
Một mức mipmap kém chi tiết hơn.
Sau đó, nội suy màu giữa hai mức mipmap đó → cho kết quả mượt hơn cả khi thu nhỏ và phóng to.
- Ưu điểm:
Kết quả rất mượt cả khi nhìn gần và xa.
Giảm nhấp nháy, mờ nhoè, nhiễu aliasing rõ rệt.
- Nhược điểm:
Tốn tài nguyên tính toán hơn hai chế độ trên.

## Premultiply Alpha
Premultiply Alpha là một cách lưu trữ giá trị màu trong ảnh có kênh alpha (độ trong suốt), trong đó giá trị màu RGB đã được nhân sẵn với giá trị alpha.
Bình thường (non-premultiplied):
Màu: R = 255, G = 255, B = 255, Alpha = 0.5
RGB vẫn giữ nguyên, không liên quan đến alpha
Premultiplied:
Màu: R = 255 × 0.5 = 127.5
Màu RGB đã nhân sẵn với Alpha

- Áp dụng khi: ảnh có độ mờ/transparency và kết hợp với nền (blending), nếu không xử lý đúng sẽ bị viền đen hoặc trắng ở rìa đối tượng mờ hoặc màu sai hoặc nhòe xấu ở vùng trong suốt
Premultiplied alpha giúp loại bỏ hiện tượng viền xấu, vì giá trị màu đã "hòa trộn" sẵn với độ trong suốt.
