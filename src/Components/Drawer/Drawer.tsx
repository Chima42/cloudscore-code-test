import style from "./styles.module.scss";
import { PropsWithChildren } from "react";

function Drawer({
  children,
  visible,
  closeDrawer,
}: PropsWithChildren<{ visible: boolean; closeDrawer: () => void }>) {
  return (
    <>
      <aside
        className={[style.drawer, visible ? style.show : style.hide].join(" ")}
      >
        <div className={style.drawerWrapper}>
          <button
            aria-label="Closes drawer"
            onClick={closeDrawer}
            className={style.close}
          >
            close
          </button>
          {children}
        </div>
      </aside>
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
