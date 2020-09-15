  
const multer = require('multer');
const path = require('path');

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // destination được sử dụng để xác định trong thư mục nào các tệp đã tải lên sẽ được lưu trữ.
        let pathOrigin = path.resolve(__dirname, '../public/images/news');
// path.resolve () được sử dụng để giải quyết một chuỗi các phân đoạn đường dẫn thành một đường dẫn tuyệt đối
  // Trả về giá trị: Nó trả về một chuỗi với đường dẫn tuyệt đối.


  // __dirname được sử dụng để lấy tên tệp và tên thư mục của tệp hiện đang thực thi.
      cb(null, pathOrigin);
    },
    filename: function (req, file, cb) {
        console.log({ file });
        // filename được sử dụng để xác định những gì các tập tin nên được đặt tên trong thư mục.
      cb(null, file.originalname)
    }
  })

  // Khởi tạo middleware uploadFile với cấu hình như ở trên,
   
  var upload = multer({ storage: storage });

  exports.uploadMulter = upload;




  // callback function VD : Bạn tới một cửa hàng để mua một món đồ mà bạn yêu thích, 
  // nhân viên cửa hàng nói với bạn rằng hiện tại món đồ đó đã hết, bạn để lại số điện thoại và yêu cầu họ gọi 
  // lại ngay sau khi có hàng. Sau đó bạn có thể đi chơi hoặc làm một công việc nào đó và không cần quan tâm tới cửa hàng đó nữa, 
  // cho tới khi bạn nhận được điện thoại thông báo của hàng đã có món đồ mà bạn yêu thích.



