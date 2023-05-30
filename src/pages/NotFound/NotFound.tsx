import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi trang bạn tìm kiếm không tồn tại."
    extra={
      <Button type="primary">
        <Link to={"/"}>Trở về trang chủ</Link>
      </Button>
    }
  />
);

export default NotFound;
