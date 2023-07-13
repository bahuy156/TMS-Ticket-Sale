import "./Header.scss";
import logoUser from "../../assets/image/logouser.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

function Header() {
  return (
    <div className="wrapper-header">
      <div className="search-header">
        <input placeholder="Search" type="text" />
        <AiOutlineSearch
          size={26}
          style={{ cursor: "pointer", color: "#1E0D03" }}
        />
      </div>
      <div className="info-header">
        <FiMail size={20} style={{ cursor: "pointer" }} />
        <FiBell size={20} style={{ cursor: "pointer" }} />
        <img src={logoUser} alt="#" />
      </div>
    </div>
  );
}

export default Header;
