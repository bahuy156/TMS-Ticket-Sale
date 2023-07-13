import "./GlobalStyles.scss";

interface PropsChildren {
  children: any;
}

function GlobalStyles(props: PropsChildren) {
  return props.children;
}

export default GlobalStyles;
