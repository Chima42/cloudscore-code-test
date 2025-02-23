export interface ICardInfo {
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

export interface ICardInfoDetail {
  title: string;
  onTrackDescription: string;
  offTrackDescription: string;
  details: Detail[];
}
