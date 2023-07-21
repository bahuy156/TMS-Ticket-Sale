import "./Tables.scss";
import { BsDot } from "react-icons/bs";

interface PropsData {
  data: any;
}

function TableFamily(props: PropsData) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>STT</th>
          <th>Booking code</th>
          <th>Số vé</th>
          <th>Tình trạng sử dụng</th>
          <th>Ngày sử dụng</th>
          <th>Ngày xuất vé</th>
          <th>Cổng check - in</th>
        </tr>
        {props.data.map((item: any, index: any) => {
          let clStatus;

          if (item.status === "Chưa sử dụng") {
            clStatus = "notused";
          } else if (item.status === "Hết hạn") {
            clStatus = "expired";
          } else if (item.status === "Đã sử dụng") {
            clStatus = "used";
          }

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.bookingcode}</td>
              <td>{item.ticketnumber}</td>
              <td className={clStatus}>
                <div className="status-content">
                  <BsDot size={30} />
                  {item.status}
                </div>
              </td>
              <td>{item.usedate}</td>
              <td>{item.exportdate}</td>
              <td>{item.gate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableFamily;
