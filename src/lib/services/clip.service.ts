import { GetClipsOptions } from "../types";
import { TwitchApiService } from "./twitch-api.service";

class ClipService {
  private readonly apiService = new TwitchApiService();

  async getBroadcasterId(channelName: string) {
    const endpoint = `users?login=${channelName}`;
    const {data} = await this.apiService.get(endpoint);
    const broadcasterId: string = data[0].id;
    return broadcasterId;
  }

  async getClips(options: GetClipsOptions) {
    const endpoint = `clips?broadcaster_id=${options.broadcasterId}&first=15&started_at=${options.timespan[0]}&ended_at=${options.timespan[1]}`;
    const {data} = await this.apiService.get(endpoint);
    console.log(data)
    return data;
  }
}

export const clipService = new ClipService();