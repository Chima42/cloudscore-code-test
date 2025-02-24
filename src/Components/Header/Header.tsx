import style from "./styles.module.scss";

function Header({ label }: { label: string }) {
  return <h1 className={style.heading}>{label}</h1>;
}

export default Header;
