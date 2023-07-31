import "./Tables.scss";
import { BsDot } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface PropsData {
  data: any;
  handleOpenModalUpdate: any;
}

function TablePack(props: PropsData) {
  const handleClickRow = (
    id: string,
    packnum: string,
    packname: string,
    ticketprice: string,
    comboprice: string,
    status: string
  ) => {
    props.handleOpenModalUpdate(id, packnum, packname, ticketprice, comboprice, status);
  };

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>STT</th>
          <th>Mã gói</th>
          <th>Tên gói vé</th>
          <th>Ngày áp dụng</th>
          <th>Ngày hết hạn</th>
          <th>Giá vé (VNĐ/Vé)</th>
          <th>Giá Combo (VNĐ/Combo)</th>
          <th>Tình trạng</th>
          <th></th>
        </tr>

        {props.data.map((item: any, index: any) => {
          let clStatus;

          if (item.status === "Đang áp dụng") {
            clStatus = "notused-setting";
          } else if (item.status === "Tắt") {
            clStatus = "expired-setting";
          }

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.packnum}</td>
              <td>{item.packname}</td>
              <td>
                <div className="date-with-time">
                  <p>{item.applicabledate}</p>
                  <p>{item.applicabletime}</p>
                </div>
              </td>
              <td>
                <div className="date-with-time">
                  <p>{item.exprieddate}</p>
                  <p>{item.expriedtime}</p>
                </div>
              </td>
              {item.ticketprice === "" ? (
                <td></td>
              ) : (
                <td>{item.ticketprice}</td>
              )}
              {item.packname === "Gói sự kiện" && item.comboprice ? (
                <td></td>
              ) : (
                <td>{item.comboprice}</td>
              )}
              <td className={clStatus}>
                <div>
                  <div className="status-content">
                    <BsDot size={30} />
                    {item.status}
                  </div>
                </div>
              </td>
              <td>
                <div
                  className="wrapper-update"
                  onClick={() =>
                    handleClickRow(
                      item.id,
                      item.packnum,
                      item.packname,
                      item.ticketprice,
                      item.comboprice,
                      item.status
                    )
                  }
                >
                  <HiOutlinePencilSquare size={24} />
                  <p>Cập nhật</p>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TablePack;
