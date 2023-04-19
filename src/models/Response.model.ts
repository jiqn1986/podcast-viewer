export interface Response {
    results: [ResponseContent]
};

export interface ResponseContent {
    trackId: number;
    trackName: string;
    releaseDate: string;
    shortDescription: string;
    trackTimeMillis: number;
    episodeUrl: string;
    artistName: string;
    artworkUrl600: string;
    description: string;
    kind: string;
}