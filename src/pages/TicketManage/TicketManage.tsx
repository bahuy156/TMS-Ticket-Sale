import "./TicketManage.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFunnel } from "react-icons/bs";
import SelectPage from "../../component/SelectPage/SelectPage";

function TicketManage() {
  return (
    <div className="wrapper-ticket">
      <h2>Danh sách vé</h2>

      <div className="wrapper-header-ticket">
        <div className="search-ticket">
          <input placeholder="Tìm bằng số vé" type="text" />
          <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
        </div>

        <div className="function-ticket">
          <button className="funnel-button">
            <BsFunnel size={20} />
            <span>Lọc vé</span>
          </button>
          <button className="export-button">
            <span>Xuất file (.csv)</span>
          </button>
        </div>
      </div>

      <div className="table-ticket">
        <table>
          <tr>
            <th>STT</th>
            <th>Booking code</th>
            <th>Số vé</th>
            <th>Tình trạng sử dụng</th>
            <th>Ngày sử dụng</th>
            <th>Ngày xuất vé</th>
            <th>Cổng check - in</th>
          </tr>

          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>2</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>3</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>4</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>5</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>6</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>7</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>8</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>9</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>

          <tr>
            <td>10</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td>Chưa sử dụng</td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
        </table>
      </div>

      <div className="select-page">
        <SelectPage />
      </div>
    </div>
  );
}

export default TicketManage;
