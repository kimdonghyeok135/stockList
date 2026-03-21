export interface NewsTopProps {
  count: number[];
  news: NewsProps[];
}

export interface NewsProps {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number; // Unix timestamp (seconds)
  type: "STORY" | string;
  thumbnail: Thumbnail;
  relatedTickers: string[];
}

export interface Thumbnail {
  resolutions: Resolution[];
}

export interface Resolution {
  url: string;
  width: number;
  height: number;
  tag: string;
}
