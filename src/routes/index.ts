import Home from "../pages/Home";
import TicketManage from "../pages/TicketManage";
import TicketCheck from "../pages/TicketCheck";
import ListEvent from "../pages/ListEvent/ListEvent";
import Management from "../pages/Management/Management";
import Setting from "../pages/Setting/Setting";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/ticket", component: TicketManage },
  { path: "/check", component: TicketCheck },
  { path: "/list", component: ListEvent },
  { path: "/manage", component: Management },
  { path: "/setting", component: Setting },
];

export { publicRoutes };
