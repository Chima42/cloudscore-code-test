import style from "./style.module.scss";
import { IPill } from "../../Interfaces/IPill";

function Pill({ onTrack, label, type }: IPill) {
  function classNames(classes: string[]) {
    return classes.join(" ");
  }
  return type === "impact" ? (
    <span className={classNames([style.pill, style.impact])}>{label}</span>
  ) : (
    <span
      className={classNames([
        style.pill,
        onTrack ? style.onTrack : style.offTrack,
      ])}
    >
      {onTrack ? "on" : "off"} track
    </span>
  );
}

export default Pill;
