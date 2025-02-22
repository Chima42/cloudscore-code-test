import style from "./style.module.scss";
import { PropsWithChildren } from "react";

function Drawer({
  children,
  visible,
  closeModal,
}: PropsWithChildren<{ visible: boolean; closeModal: () => void }>) {
  return (
    <aside>
      <div
        className={[style.drawer, visible ? style.show : style.hide].join(" ")}
      >
        <p onClick={closeModal} className={style.close}>
          close
        </p>
        {children}
      </div>
      <div
        className={[
          style.background,
          visible ? style.visible : style.transparent,
        ].join(" ")}
      ></div>
    </aside>
  );
}

export default Drawer;
