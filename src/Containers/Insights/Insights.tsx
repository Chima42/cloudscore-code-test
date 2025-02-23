import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { IAccount, IPersonal, IUserData } from "../../Interfaces/IUserData";
import CardWrapper from "../CardWrapper/CardWrapper";
import Pill from "../../Components/Pill/Pill";
import Drawer from "../../Components/Drawer/Drawer";
import DrawerDetailWrapper from "../../Components/Drawer/DrawerDetail";
import { ICardInfo, ICardInfoDetail } from "../../Interfaces/ICardInfo";

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
        setCardInfo(populateData(personal, accounts));
      } catch (e) {
        // log to Sentry or something similar
        console.log(e);
      }
    }

    loadData();
  }, []);

  function populateData(personalData: IPersonal, accountsData: IAccount[]) {
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
    const creditCard = accountsData.find(
      (data) => data.accountCategory === "credit_cards"
    );
    return fixedData.map((data) => {
      if (data.heading === "Electoral roll") {
        data.onTrack = personalData.electoralRoll.some((roll) => roll.current);
      } else if (data.heading === "Public information") {
        data.onTrack =
          personalData.publicInfo.courtAndInsolvencies.length === 0;
      } else {
        data.onTrack = creditCard?.overview?.utilization! < 0.5;
      }
      return data;
    });
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  async function openDrawer(id: number) {
    if (cardInfoDetail?.id === id) {
      setDrawerOpen(true);
      return;
    }
    const isOnTrack = cardInfo.find((info) => info.id === id)?.onTrack || false;
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
      <CardWrapper cards={cardInfo} handleOpenDrawer={openDrawer} />
    </section>
  );
}

export default Insights;
