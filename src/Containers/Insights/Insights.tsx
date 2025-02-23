import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { IUserData } from "../../Interfaces/IUserData";
import CardWrapper from "../CardWrapper/CardWrapper";
import Card from "../../Components/Card/Card";
import Pill from "../../Components/Pill/Pill";
import style from "./../../Components/Card/style.module.scss";
import Drawer from "../../Components/Drawer/Drawer";
import DrawerDetailWrapper from "../../Components/Drawer/DrawerDetail";

interface ICardInfo {
  id: number;
  heading: string;
  description: string;
  impact: string;
  onTrack: boolean;
  buttonLabel?: string;
}

interface Detail {
  title: string;
  description: string;
}

interface ICardInfoDetail {
  title: string;
  onTrackDescription: string;
  offTrackDescription: string;
  details: Detail[];
}
interface ICardInfoDetailUI extends ICardInfoDetail {
  id: number;
  isOnTrack: boolean;
}

function Insights() {
  const [cardInfo, setCardInfo] = useState<ICardInfo[]>([]);
  const [cardInfoDetail, setCardInfoDetail] = useState<ICardInfoDetailUI>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/6107fbe9f14b8b153e05e714?meta=false"
        );
        const { accounts, personal }: IUserData = await response.json();

        const fixedData = [
          {
            id: 1,
            heading: "Electoral roll",
            description: "Being on the electoral roll can improve your score",
            impact: "Medium Impact",
            onTrack: false,
            buttonLabel: "Learn more",
          },
          {
            id: 2,
            heading: "Public information",
            description:
              "Bankruptcies and individual voluntary arrangements can damage your score",
            impact: "High Impact",
            onTrack: false,
          },
          {
            id: 3,
            heading: "Credit utilisation",
            description:
              "Using more than 50% of your available credit can damage your score",
            impact: "Medium Impact",
            onTrack: false,
          },
        ];

        const creditCard = accounts.find(
          (x) => x.accountCategory === "credit_cards"
        );

        setCardInfo(
          fixedData.map((data) => {
            if (data.heading === "Electoral roll") {
              data.onTrack = personal.electoralRoll.some((x) => x.current);
            } else if (data.heading === "Public information") {
              data.onTrack =
                personal.publicInfo.courtAndInsolvencies.length === 0;
            } else {
              data.onTrack = creditCard?.overview?.utilization! < 0.5;
            }
            return data;
          })
        );
      } catch (e) {
        // log to Sentry or something similar
        console.log(e);
      }
    }

    loadData();
  }, []);

  function closeDrawer() {
    setDrawerOpen(false);
  }

  async function openDrawer(id: number) {
    if (cardInfoDetail?.id === id) {
      setDrawerOpen(true);
      return;
    }
    const isOnTrack = cardInfo.find((x) => x.id === id)?.onTrack || false;
    setDrawerOpen(true);
    await loadDetail({ id, isOnTrack });
  }

  async function loadDetail({
    id,
    isOnTrack,
  }: {
    id: number;
    isOnTrack: boolean;
  }) {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/6128c389c5159b35ae04d4ed/1?meta=false"
      );
      const detail: ICardInfoDetail = await response.json();
      const detailWithCardId: ICardInfoDetailUI = { ...detail, id, isOnTrack };
      setCardInfoDetail(detailWithCardId);
    } catch (e) {
      // log to Sentry or something similar
      console.log(e);
    }
  }

  if (cardInfo.length === 0) return "Loading...";

  return (
    <section>
      <Drawer visible={drawerOpen} closeDrawer={closeDrawer}>
        {cardInfoDetail && (
          <>
            <Pill type="track" onTrack={cardInfoDetail.isOnTrack} />
            <DrawerDetailWrapper>
              <h2>{cardInfoDetail.title}</h2>
              <p>
                {cardInfoDetail.isOnTrack
                  ? cardInfoDetail.onTrackDescription
                  : cardInfoDetail.offTrackDescription}
              </p>
            </DrawerDetailWrapper>
            {cardInfoDetail.details.map(({ title, description }) => (
              <DrawerDetailWrapper key={title}>
                <h4>{title}</h4>
                <p>{description}</p>
              </DrawerDetailWrapper>
            ))}
          </>
        )}
      </Drawer>
      <Header label="Insights" />
      <CardWrapper>
        {cardInfo.map(
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
                <button onClick={() => openDrawer(id)}>{buttonLabel}</button>
              )}
              <Pill label={impact} type="impact" />
            </Card>
          )
        )}
      </CardWrapper>
    </section>
  );
}

export default Insights;
