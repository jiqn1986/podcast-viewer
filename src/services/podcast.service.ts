import axios from 'axios';

export const getPodcasts = (): Promise<any> => {
    const options = {
		method: 'GET',
		url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    };
    return axios.request(options);
}

export const getPodcastDetails = (id: string): Promise<any> => {
  console.log('llamada')
    const apiUrl = `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode`
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`
    const options = {
      method: 'GET',
      url: url,
    };
    return axios.request(options);
}
