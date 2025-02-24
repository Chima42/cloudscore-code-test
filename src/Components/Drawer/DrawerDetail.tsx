import { PropsWithChildren } from "react";
import style from "./styles.module.scss";

function DrawerDetailWrapper({ children }: PropsWithChildren) {
  return <div className={style.wrapper}> {children} </div>;
}

export default DrawerDetailWrapper;
