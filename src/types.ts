export type SearchQuery = {
  title: string;
  streamer: string;
};

export type Clip = {
  id: string;
  url: string;
  embedUrl: string;
  broadcasterName: string;
  creatorName: string;
  title: string;
  viewCount: number;
  createdAt: Date;
}

export type ResponseDetails = {
  pagination: string;
  broadcasterId: string;
}