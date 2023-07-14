import "./TicketCheck.scss";
import { AiOutlineSearch } from "react-icons/ai";
import SelectPage from "../../component/SelectPage/SelectPage";

function TicketCheck() {
  return (
    <div className="wrapper-ticketcheck">
      <div className="ticketcheck">
        <h2>Đối soát vé</h2>

        <div className="wrapper-header-ticketcheck">
          <div className="search-ticketcheck">
            <input placeholder="Tìm bằng số vé" type="text" />
            <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
          </div>

          <div className="check-button">
            <button>Chốt đối soát</button>
          </div>
        </div>

        <div className="table-ticket">
          <table>
            <tr>
              <th>STT</th>
              <th>Số vé</th>
              <th>Tên sự kiện</th>
              <th>Ngày sử dụng</th>
              <th>Loại vé</th>
              <th>Cổng check - in</th>
              <th></th>
            </tr>

            <tr>
              <td>1</td>
              <td>205314876321</td>
              <td>Hội chợ triển lãm tiêu dùng 2021</td>
              <td>14/04/2021</td>
              <td>Vé cổng</td>
              <td>Cổng 1</td>
              <td>Chưa đối soát</td>
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

      <div className="ticketfunnel">
        <h3>Lọc vé</h3>

        <div className="check-status">
          <div className="check-input">
            <p>Tình trạng đối soát</p>
            <div className="check-input-child">
              <div className="check-input-child-type">
                <input type="radio" />
                <span>Tất cả</span>
              </div>
              <div className="check-input-child-type">
                <input type="radio" />
                <span>Đã đối soát</span>
              </div>
              <div className="check-input-child-type">
                <input type="radio" />
                <span>Chưa đối soát</span>
              </div>
            </div>
          </div>

          <div className="type-rangeday-check">
            <div className="type-check">
              <p>Loại vé</p>
              <span>Vé cổng</span>
            </div>
            <div className="since-check">
              <p>Từ ngày</p>
              <input type="date" />
            </div>
            <div className="todate-check">
              <p>Đến ngày</p>
              <input type="date" />
            </div>
          </div>

          <div className="filter-check">
            <button>Lọc</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCheck;
