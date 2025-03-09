'use client';

import React from "react";
import styles from "./Styles.module.scss";

export default function Home() {
  const [tvShows, setTvShows] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);

  const fetchAPI = async (page: number) => {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}&sort_by=popularity.desc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setTvShows(json.results);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchAPI(page);
  }, [page]);

  return (
    <main className={styles.main}>
      <h1>Popular TV Shows</h1>
      <div className={styles.grid}>
        {tvShows.map((show) => (
          <div key={show.id} className={styles.card}>
            <a href={`/${show.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className={styles.image} />
            </a>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
}