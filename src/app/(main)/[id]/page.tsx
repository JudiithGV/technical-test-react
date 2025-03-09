'use client';
import { useEffect, useState } from 'react';
import styles from './Styles.module.scss';

interface Params {
  params: {
    id: string;
  };
}

export default function Detail({
  params,
}: Params) {
  const [series, setSeries] = useState<{
    name: string;
    overview: string;
    genres: { id: number; name: string }[];
    first_air_date: string;
    vote_average: number;
    poster_path: string;
    episode_run_time: number[];
    homepage: string;
    status: string;
    tagline: string;
    seasons: {
      season_number: number;
      episode_count: number;
      air_date: string;
      poster_path: string;
    }[];
  } | null>(null);
  const { id } = params;

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (id) {
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => setSeries(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  if (!series) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{series.name}</h1>
          <p>{series.overview}</p>
          <ul>
            {series.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p className={styles['first-air-date']}>First air date: {series.first_air_date}</p>
          <p className={styles.rating}>Rating: {series.vote_average}</p>
          <p className={styles['episode-run-time']}>Episode run time: {series.episode_run_time.join(', ')} minutes</p>
          <p className={styles.homepage}>Homepage: <a href={series.homepage} target="_blank" rel="noopener noreferrer">{series.homepage}</a></p>
          <p className={styles.status}>Status: {series.status}</p>
          <p className={styles.tagline}>Tagline: {series.tagline}</p>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} className={styles.image} />
      </div>
      <div className={styles.episodes}>
        <h2>Seasons</h2>
        {series.seasons.map(season => (
          <div key={season.season_number} className={styles.season}>
            <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={`Season ${season.season_number}`} className={styles.seasonImage} />
            <div className={styles.seasonDetails}>
              <h3>Season {season.season_number}</h3>
              <p>Episodes: {season.episode_count}</p>
              <p>Air Date: {season.air_date}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}