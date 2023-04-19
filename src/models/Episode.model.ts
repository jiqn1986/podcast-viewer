export interface EpisodeInfo {
    id: number;
    name: string;
    description?: string;
    date: string;
    duration: number;
    url: string;
    kind?: string;
}