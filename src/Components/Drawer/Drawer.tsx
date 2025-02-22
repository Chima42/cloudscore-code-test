import style from "./style.module.scss";
import { PropsWithChildren } from "react";

function Drawer({ children }: PropsWithChildren) {
  return <div className={style.drawer}>{children}</div>;
}

export default Drawer;
