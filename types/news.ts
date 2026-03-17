type NewsTopProps = {
  count: [];
  news: NewsProps[];
};

type NewsProps = {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number; // Unix timestamp (seconds)
  type: "STORY" | string;
  thumbnail: Thumbnail;
  relatedTickers: string[];
};

type Thumbnail = {
  resolutions: Resolution[];
};

type Resolution = {
  url: string;
  width: number;
  height: number;
  tag: string;
};
