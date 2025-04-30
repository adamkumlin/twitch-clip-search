export interface SearchQuery {
  title: string;
  streamer: string;
  startDate: Date;
  endDate: Date;
}

export interface Clip {
  id: string;
  url: string;
  embedUrl: string;
  broadcasterName: string;
  thumbnailUrl: string;
  creatorName: string;
  title: string;
  viewCount: number;
  createdAt: Date;
}

export interface ResponseDetails {
  pagination: string;
  broadcasterId: string;
}

export interface SortMetric {
  title: string;
  date: Date;
  views: string;
}

export interface SortOption {
  metric: SortMetric;
  fromTop: boolean;
}
