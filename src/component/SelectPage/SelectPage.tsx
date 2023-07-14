import "./SelectPage.scss";
import { Pagination } from "antd";

function SelectPage() {
  return (
    <div className="select-page">
      <Pagination showSizeChanger={false} defaultCurrent={1} total={50} />
    </div>
  );
}

export default SelectPage;
