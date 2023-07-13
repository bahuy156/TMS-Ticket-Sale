import "./Menu.scss";
import iconLogo from "../../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { publicRoutes } from "../../routes";

import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiMonitor } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";

function Menu() {
  return (
    <div className="wrapper-menu">
      <div className="logo">
        <img src={iconLogo} alt="" />
      </div>

      <div className="nav">
        <NavLink to={publicRoutes[0].path} className="nav-child">
          <BiHomeAlt size={21} />
          <span>Trang chủ</span>
        </NavLink>

        <NavLink to={publicRoutes[1].path} className="nav-child">
          <HiOutlineTicket size={21} />
          <span>Quản lý vé</span>
        </NavLink>

        <NavLink to={publicRoutes[2].path} className="nav-child">
          <TbFileInvoice size={21} />
          <span>Đối soát vé</span>
        </NavLink>

        <NavLink to={publicRoutes[3].path} className="nav-child">
          <AiOutlineUnorderedList size={21} />
          <span>Danh sách sự kiện</span>
        </NavLink>

        <NavLink to={publicRoutes[4].path} className="nav-child">
          <FiMonitor size={21} />
          <span>Quản lý thiết bị</span>
        </NavLink>

        <NavLink to={publicRoutes[5].path} className="nav-child">
          <AiOutlineSetting size={21} />
          <span>Cài đặt</span>
        </NavLink>

        <div className="services-menu">Gói dịch vụ</div>
      </div>
    </div>
  );
}

export default Menu;
