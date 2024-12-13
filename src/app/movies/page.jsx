"use client";
import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import MovieCard from "../components/MovieCard";
import styles from "@/app/styles/common.module.css";
import Loading from "../Loading";

dotenv.config();

const Movies = () => {
  const [data, setData] = useState([]);
  const url = process.env.NEXT_PUBLIC_URL;
  console.log(url, "From url");
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '4601465825msh51e50558eda2cc5p1e6a54jsnb0264e297892',
      'x-rapidapi-host': 'netflix54.p.rapidapi.com'
    }
  };
    useEffect(() => {
      if (!url) {
        throw new Error("URL is not defined in the environment variables");
      }
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.titles, "From Page");
        setData(result.titles);
      } catch (err) {
        console.log("Error in fetching the data", err);
      }
    };
    fetchMovies();
  }, [url]);
  return (
    <section className={styles.movieSection}>
      <div className={styles.container} >
        <h1>Series & Movie</h1>
        <div className={styles.card_section} key={data.id}>

        {data?.length > 0 ? (
          data.map((currele) => {
            return <MovieCard {...currele} key={currele?.id} />;
          })
        ) : (
          <Loading/>
        )}

        </div>
      </div>
    </section>
  );
};

export default Movies;
