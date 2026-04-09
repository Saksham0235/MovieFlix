"use client";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { Suspense } from "react";
import MovieCard from "@/app/components/MovieCard";
import styles from "@/app/styles/common.module.css";
import Link from "next/link";
import { DebounceSearch, rawData } from "./[id]/utils";
import { useSearchParams } from "next/navigation";

const Movie = () => {
  const searchParams = useSearchParams();
  const ref=useRef(null)
  const pageParam = searchParams.get("page");
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data,setData]=useState([])
  const debouncedSearch = useMemo(() => {
    return DebounceSearch(setSearchTerm, 500);
  }, []);
  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };
  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // cleanup
    };
  }, [debouncedSearch]);

  const totalData = 177;
  const dataPerPage = 8;

  const totalPages = Math.ceil(totalData / dataPerPage);
  // Creating offset i.e . the number of items to skip before beginning to collect the result set

  let currPage = 1;

  if (Number(pageParam) >= 1) {
    currPage = Number(pageParam);
  }

  // We have to leave these offset before showing the next data
  let offset = (currPage - 1) * dataPerPage;
  let pageNumbers = [];

  //  Creating loop to generate and show pagenumbers before and after the curr page
  for (let i = currPage - 3; i <= currPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;

    pageNumbers.push(i);
  }

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ff6a4736b9msh38e290b88238d8fp108eb8jsnd3124f857ec2",
      "x-rapidapi-host": "netflix54.p.rapidapi.com",
    },
  };


  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await fetch(`https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`,
          options
        );
        const data = await res.json();
        console.log(JSON.stringify(data), "from data");
        setData(data?.titles)
      } catch (err) {
        console.log("Error in FEtching DAta -> ", err);
      }
    };
    getData()
  },[])

  
  const main_data = data;
  console.log(main_data,'from main_data')
  const filteredData = main_data?.filter((ele) =>
    ele?.jawSummary?.title?.substring(0, 18)?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <h1>Series & Movie</h1>
            <div className={styles.searchContainer}>
              <input placeholder="Search... " className={styles.inputbox} value={input} onChange={handleInput} />
              <img
                className={styles.searchicon}
                src="/searchicon.png"
                alt="search"
              />
            </div>
          </div>
          <div className={styles.card_section}>
            {filteredData.map((curElem,ind) => {
              return <MovieCard key={ind} {...curElem} />;
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "12rem",
            justifyContent: "center",
          }}
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
    </>
  );
};

export default Movie;
