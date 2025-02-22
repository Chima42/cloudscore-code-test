import { PropsWithChildren } from "react";
import style from "./styles.module.scss";

function CardWrapper({ children }: PropsWithChildren) {
  return (
    <section className={style.cardWrapper}>
      <div className={style.innerWrapper}>{children}</div>
    </section>
  );
}

export default CardWrapper;
