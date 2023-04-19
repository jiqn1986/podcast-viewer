import axios from 'axios';

// TOD: To move to env file for privacy
const API_URL = 'https://itunes.apple.com';
const BYPASS_URL = 'https://api.allorigins.win/get?url=';
export const PODCAST_STORAGE_NAME = 'podcastsList';

export const getPodcasts = (): Promise<any> => {
  const storageObject = checkRequest(PODCAST_STORAGE_NAME);

  if (storageObject) {
    return new Promise((resolve) => {
      resolve(storageObject);
    });
  }
    const options = {
		method: 'GET',
		url: `${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
    };
    return axios.request(options);
}

export const getPodcastDetails = (id: string): Promise<any> => {
  const storageObject = checkRequest(id);

  if (storageObject) {
    return new Promise((resolve) => {
      resolve(storageObject);
    });
  }

  const apiUrl = `${API_URL}/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode`
  const url = `${BYPASS_URL}${encodeURIComponent(apiUrl)}`
  const options = {
    method: 'GET',
    url: url,
  };
  return axios.request(options);
}

const checkRequest = (name: string): any => {
  const requestValue = localStorage.getItem(name);
  if (requestValue) {
    try {
      const requestObject = JSON.parse(requestValue);
      const now = new Date().getTime();
      return now < requestObject.date ? requestObject.value : null;   
    } catch (e) {
      return null
    }
  }
  return null;
}

export const storageRequest = (name: string, value: any): void => {
  const now = new Date();
  now.setDate(now.getDate() + 1)
  const valueObject = {
    date: now.getTime(),
    value
  };
  localStorage.setItem(name, JSON.stringify(valueObject));
}
