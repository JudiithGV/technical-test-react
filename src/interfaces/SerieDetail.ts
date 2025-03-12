export interface ISerieDetail {
    name: string;
    overview: string;
    genres: IGenre[];
    first_air_date: string;
    vote_average: number;
    poster_path: string;
    episode_run_time: number[];
    homepage: string;
    status: string;
    tagline: string;
    seasons: ISeason[];
}

interface IGenre {
    id: number; 
    name: string
}

interface ISeason {
    season_number: number;
    episode_count: number;
    air_date: string;
    poster_path: string;
}