import style from "./style.module.scss";
import { PropsWithChildren } from "react";

function Drawer({
  children,
  visible,
}: PropsWithChildren<{ visible: boolean }>) {
  return (
    <>
      <div
        className={[style.drawer, visible ? style.show : style.hide].join(" ")}
      >
        {children}
      </div>
      <div
        className={[
          style.background,
          visible ? style.visible : style.transparent,
        ].join(" ")}
      ></div>
    </>
  );
}

export default Drawer;
