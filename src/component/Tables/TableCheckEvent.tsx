interface PropsData {
  data: any;
}

function TableCheckEvent(props: PropsData) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>STT</th>
          <th>Số vé</th>
          <th>Tên sự kiện</th>
          <th>Ngày sử dụng</th>
          <th>Loại vé</th>
          <th>Cổng check - in</th>
          <th></th>
        </tr>

        {props.data.map((item: any, index: any) => {
          let clsStatus

          if (item.status === "Chưa đối soát") {
            clsStatus = "uncontested"
          } else if (item.status === "Đã đối soát") {
            clsStatus = "checked"
          }

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.ticketnumber}</td>
              <td>{item.eventname}</td>
              <td>{item.usedate}</td>
              <td>{item.tickettype}</td>
              <td>{item.gate}</td>
              <td className={clsStatus}>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableCheckEvent;
