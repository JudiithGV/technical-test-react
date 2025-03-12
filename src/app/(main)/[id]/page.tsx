'use client';
import { useEffect, useState } from 'react';
import styles from './Styles.module.scss';
import { useParams } from 'next/navigation';
import { getYear } from 'date-fns';
import { ISerieDetail } from '@/interfaces/SerieDetail';


export default function Detail() {
  const [series, setSeries] = useState<ISerieDetail | null>(null);
  const { id } = useParams<{ id: string }>();
  
  const imageUrl = process.env.IMAGE_URL;
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (id) {
      fetch(`${apiUrl}/${id}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => setSeries(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  if (!series) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className={styles.starFilled}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>☆</span>);
      }
    }
    return stars;
  };

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
          <p className={styles['first-air-date']}>First air date: {getYear(series.first_air_date)}</p>
          <a className={styles.homepage} href={series.homepage} target="_blank" rel="noopener noreferrer">Homepage</a>
          <p className={styles.status}>Status: {series.status}</p>
        </div>
        <div>
          <img src={`${imageUrl}${series.poster_path}`} alt={series.name} className={styles.image} />
          <div className={styles.starRating}>
            {renderStars(Math.round(series.vote_average / 2))}
          </div>
        </div>
      </div>
      <div className={styles.episodes}>
        <h2>Seasons</h2>
        {series.seasons.map(season => (
          <div key={season.season_number} className={styles.season}>
            <div className={styles.seasonImageContainer}>
              <img src={`${imageUrl}${season.poster_path}`} alt={`Season ${season.season_number}`} className={styles.seasonImage} />
            </div>
            <div className={styles.seasonDetails}>
              <h3>Season {season.season_number}</h3>
              <p>Episodes: {season.episode_count}</p>
              <p>Air Date: {getYear(season.air_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}