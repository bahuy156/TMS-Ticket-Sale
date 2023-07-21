import Home from "../pages/Home";
import TicketManage from "../pages/TicketManage";
import TicketCheck from "../pages/TicketCheck";
import Setting from "../pages/Setting/Setting";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/ticket", component: TicketManage },
  { path: "/check", component: TicketCheck },
  { path: "/setting", component: Setting },
];

export { publicRoutes };
