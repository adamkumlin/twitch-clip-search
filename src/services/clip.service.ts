import { TwitchApiService } from "./twitch-api.service";

class ClipService {
  private readonly apiService = new TwitchApiService();

  async getBroadcasterId(channelName: string) {
    const endpoint = `users?login=${channelName}`;
    const {data} = await this.apiService.get(endpoint);
    const broadcasterId = data[0].id;
    return broadcasterId;
  }

  async getClips() {

  }
}

export const clipService = new ClipService();