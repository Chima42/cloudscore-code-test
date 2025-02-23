import style from "./styles.module.scss";
import { ICardInfo } from "../../Interfaces/ICardInfo";
import Card from "../../Components/Card/Card";
import Pill from "../../Components/Pill/Pill";

interface ICardWrapper {
  cards: ICardInfo[];
  handleOpenDrawer: (id: number) => void;
}

function CardWrapper({ cards, handleOpenDrawer }: ICardWrapper) {
  return (
    <section className={style.cardWrapper}>
      <div className={style.innerWrapper}>
        {cards.map(
          ({ heading, impact, description, onTrack, buttonLabel, id }) => (
            <Card key={heading.replace(" ", "-")}>
              <div className={style.pillWrapper}>
                <Pill type="track" onTrack={onTrack} />
                <Pill label={impact} type="impact" />
              </div>
              <div className={style.content}>
                <h3>{heading}</h3>
                <p>{description}</p>
              </div>
              {buttonLabel && (
                <button
                  aria-label="Opens drawer with more detail about this card"
                  onClick={() => handleOpenDrawer(id)}
                >
                  {buttonLabel}
                </button>
              )}
              <Pill label={impact} type="impact" />
            </Card>
          )
        )}
      </div>
    </section>
  );
}

export default CardWrapper;
