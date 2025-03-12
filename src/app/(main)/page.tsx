'use client';

import React from "react";
import styles from "./Styles.module.scss";
import { ISeriesList } from "@/interfaces/SeriesList";

export default function Home() {
  const [tvShows, setTvShows] = React.useState<ISeriesList[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const imageUrl = process.env.IMAGE_URL;
  const apiUrl = process.env.API_URL;

  const fetchAPI = async (page: number) => {
    const apiKey = process.env.API_KEY;
    const url = `${apiUrl}/popular?api_key=${apiKey}&page=${page}`;
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
              <img src={`${imageUrl}${show.poster_path}`} alt={show.name} className={styles.image} />
            </a>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button className={styles.button} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button className={styles.button} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
}