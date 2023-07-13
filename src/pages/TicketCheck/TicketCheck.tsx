import "./TicketCheck.scss";
import { AiOutlineSearch } from "react-icons/ai";

function TicketCheck() {
  return (
    <div className="wrapper-ticketcheck">
      <h2>Đối soát vé</h2>

      <div className="search-ticketcheck">
        <input placeholder="Tìm bằng số vé" type="text" />
        <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
      </div>

      <div className="table-ticket"></div>
    </div>
  );
}

export default TicketCheck;
