"use client";
import React, { useEffect, useState, use } from "react";
import dotenv from "dotenv";
import MovieCard from "../components/MovieCard";
import styles from "@/app/styles/common.module.css";
import Loading from "../Loading";
import Link from "next/link";

dotenv.config();

const Movies = ({ searchParams: promiseSearchParams }) => {
  const searchParams = use(promiseSearchParams);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4601465825msh51e50558eda2cc5p1e6a54jsnb0264e297892",
      "x-rapidapi-host": "netflix54.p.rapidapi.com",
    },
  };
  const totalData = 177;
  const dataPerPage = 8;

  const totalPages = Math.ceil(totalData / dataPerPage);
  // Creating offset i.e . the number of items to skip before beginning to collect the result set

  let currPage = 1;

  if (Number(searchParams.page) >= 1) {
    currPage = Number(searchParams.page);
  }

  // We have to leave these offset before showing the next data
  let offset = (currPage - 1) * dataPerPage;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`,
          options
        );
        const result = await response.json();
        setData(result.titles);
        setLoading(false);
      } catch (err) {
        console.log("Error in fetching the data", err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [offset]);
  let pageNumbers = [];

  //  Creating loop to generate and show pagenumbers before and after the curr page
  for (let i = currPage - 3; i <= currPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;

    pageNumbers.push(i);
  }
  return (
    <section className={styles.movieSection}>
      <div className={styles.container}>
        <h1>Series & Movie</h1>
        <div className={styles.card_section}>
          {loading ? (
            <Loading />
          ) : (
            data?.map((currele) => {
              return <MovieCard {...currele} key={currele?.id} />;
            })
          )}
        </div>
      </div>
      <div
        style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
        className={styles.container}
      >
        {currPage - 1 >= 1 && (
          <>
            <Link href="/movies">{"<<"}</Link>
          </>
        )}
        {pageNumbers.map((ele) => (
          <Link
            key={ele}
            href={`/movies?page=${ele}`}
            className={ele === currPage ? styles.activeLink : ""}
          >
            {ele}
          </Link>
        ))}

        {currPage + 1 <= totalPages && (
          <>
            <Link href="/movies">{">>"}</Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Movies;
