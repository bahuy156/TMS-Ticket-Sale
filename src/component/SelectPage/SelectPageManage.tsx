import "./SelectPage.scss";
import { Pagination } from "antd";

interface PropsPage {
  data: any;
  currentPage: any
  rowPerPage: any
  handleChangePages: any;
}

function SelectPageManage(props: PropsPage) { 
  return (
    <div className="select-page-child">
      <Pagination
        className="page"
        current={props.currentPage}
        total={props.data.length}
        defaultPageSize={props.rowPerPage}
        onChange={props.handleChangePages}
        showSizeChanger={false}
      />
    </div>
  );
}

export default SelectPageManage;
