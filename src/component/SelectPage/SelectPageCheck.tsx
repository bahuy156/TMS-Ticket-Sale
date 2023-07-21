import "./SelectPage.scss";
import { Pagination } from "antd";

interface PropsData {
  data: any
  currentPage: any
  rowsPerPage: any
  handlePageChange: any
}

function SelectPageCheck(props: PropsData) { 
  return (
    <div className="select-page-child">
      <Pagination
        className="page"
        current={props.currentPage}
        total={props.data.length}
        defaultPageSize={props.rowsPerPage}
        onChange={props.handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default SelectPageCheck;
