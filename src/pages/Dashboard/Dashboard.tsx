import dashboardSvg from "@/assets/dashboard-bg.jpg";
import { Result, Image } from "antd";

const Dashboard = () => {
  return (
    <Result
      icon={
        <Image height={500} width={500} src={dashboardSvg} preview={false} />
      }
      subTitle="Chào bạn đến với trang chủ"
    ></Result>
  );
};

export default Dashboard;
