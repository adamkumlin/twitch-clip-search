export class Clip {
  id: string;
  url: string;
  embedUrl: string;
  broadcasterName: string;
  creatorName: string;
  title: string;
  viewCount: number;
  createdAt: Date;

  constructor(id: string, url: string, embedUrl: string, broadcasterName: string, creatorName: string, title: string, viewCount: number, createdAt: Date) {
    this.id = id;
    this.url = url;
    this.embedUrl = embedUrl;
    this.broadcasterName = broadcasterName;
    this.creatorName = creatorName;
    this.title = title;
    this.viewCount = viewCount;
    this.createdAt = createdAt;
  }
}