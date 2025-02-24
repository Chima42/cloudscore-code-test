import style from "./styles.module.scss";
import { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return <article className={style.card}>{children}</article>;
}

export default Card;
