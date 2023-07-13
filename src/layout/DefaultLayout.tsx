import NavBar from "../component/NavBar";
import Header from "../component/Header";
import "./DefaultLayout.scss";

interface PropsLayouts {
  children: any;
}

function DefaultLayout(props: PropsLayouts) {
  return (
    <div className="wrapper-default">
      <NavBar />
      <div className="content-layout">
        <Header />
        <div className="content-layout-child">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
