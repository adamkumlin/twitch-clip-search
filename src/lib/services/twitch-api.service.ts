export class TwitchApiService {
  private requestBaseUrl: string = "https://api.twitch.tv/helix";
  private requestHeaders = {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      "Client-Id": import.meta.env.VITE_CLIENT_ID,
  };

  async get(endpoint: string) {
    const url = `${this.requestBaseUrl}/${endpoint}`;
    const res = await fetch(url, {headers: this.requestHeaders, method: "GET"});
    const data = await res.json();
    console.log(data)
    return data;
  }
}
