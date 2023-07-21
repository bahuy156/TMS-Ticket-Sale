import ChartDoughnut from "../../component/Charts/DoughtnutChart";
import LineChartComponent from "../../component/Charts/Linechart";
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
            picker="month"
            placeholder="Chọn tháng"
            className="date-chart-input"
            format="M, YYYY"
          />
        </div>

        <div className="content-chart">
          <LineChartComponent />
        </div>

        <div className="total-revenue">
          <p className="title-revenue">Tổng doanh thu theo tuần</p>
          <div className="number-revenue">
            <span>525.145.000</span>
            <span>đồng</span>
          </div>
        </div>

        <div className="footer-chart">
          <DatePicker
            picker="month"
            placeholder="Chọn tháng"
            className="date-chart-input"
            format="M, YYYY"
          />

          <div className="chart-package">
            <div className="chart-package-child">
              <p>Gói gia đình</p>
              <div className="chart-circle">
                <ChartDoughnut />
              </div>
            </div>
            <div className="chart-package-child">
              <p>Gói sự kiện</p>
              <div className="chart-circle">
                <ChartDoughnut />
              </div>
            </div>
          </div>

          <div className="desc-chart">
            <div className="desc-chart-child">
              <button className="bt1"></button>
              <p>Vé đã sử dụng</p>
            </div>
            <div className="desc-chart-child">
              <button className="bt2"></button>
              <p>Vé chưa sử dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
