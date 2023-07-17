import "./Home.scss";
import { DatePicker } from "antd";

function Home() {
  return (
    <div className="wrapper-home">
      <h2>Thống kê</h2>
      <div className="wrapper-chart">
        <div className="header-chart">
          <p>Doanh thu</p>
          <DatePicker
            placeholder="Chọn tháng"
            className="date-chart-input"
            format="DD/MM/YYYY"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
