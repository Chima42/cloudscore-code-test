import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { IUserData } from "../../Interfaces/IUserData";
import CardWrapper from "../CardWrapper/CardWrapper";
import Card from "../../Components/Card/Card";
import Pill from "../../Components/Pill/Pill";
import style from "./../../Components/Card/style.module.scss";
import Drawer from "../../Components/Drawer/Drawer";
import closeIcon from "/close.svg";
import viteLogo from "/vite.svg";
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

function Insights() {
  const [cardInfo, setCardInfo] = useState<ICardInfo[]>([]);
  const [cardInfoDetail, setCardInfoDetail] = useState<ICardInfoDetail>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSelectedCardOnTrack, setSelectedCardOnTrack] = useState(false);

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
        console.log(e);
      }
    }

    loadData();
  }, []);

  function closeModal() {
    setModalOpen(false);
  }

  async function openModal(id: number) {
    setSelectedCardOnTrack(cardInfo.find((x) => x.id === id)?.onTrack || false);
    setModalOpen(true);
    await loadDetail();
  }

  async function loadDetail() {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/6128c389c5159b35ae04d4ed/1?meta=false"
      );
      const detail: ICardInfoDetail = await response.json();
      setCardInfoDetail(detail);
    } catch (e) {
      console.log(e);
    }
  }

  if (cardInfo.length === 0) return "Loading...";

  return (
    <>
      <Drawer visible={modalOpen}>
        {cardInfoDetail && (
          <>
            <Pill type="track" onTrack={isSelectedCardOnTrack} />
            <img src={viteLogo} onClick={closeModal} alt="" />
            <h2>{cardInfoDetail.title}</h2>
            <p>
              {isSelectedCardOnTrack
                ? cardInfoDetail.onTrackDescription
                : cardInfoDetail.offTrackDescription}
            </p>
            <DrawerDetailWrapper>
              {cardInfoDetail.details.map((x) => (
                <div className={style.details}>
                  <p>{x.title}</p>
                  <p>{x.description}</p>
                </div>
              ))}
            </DrawerDetailWrapper>
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
                <button onClick={() => openModal(id)}>{buttonLabel}</button>
              )}
              <Pill label={impact} type="impact" />
            </Card>
          )
        )}
      </CardWrapper>
    </>
  );
}

export default Insights;
