import style from "./style.module.scss";
import { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return <div className={style.card}>{children}</div>;
}

export default Card;
