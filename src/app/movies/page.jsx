"use client";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "@/app/components/MovieCard";
import styles from "@/app/styles/common.module.css";
import { DebounceSearch, rawData } from "./[id]/utils";

const Movie = () => {
  const ref = useRef(null);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [slide, setSlides] = useState(8);
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
      debouncedSearch.cancel(); 
    };
  }, [debouncedSearch]);

  const main_data = rawData?.titles;
  const filteredData = main_data?.filter((ele) =>ele?.jawSummary?.title?.substring(0, 18)?.toLowerCase()?.includes(searchTerm.toLowerCase())).slice(0,slide)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting) {
          setSlides((prev) => {
            if (prev >= (main_data?.length || 0)) return prev;
            return prev + 4;
          });
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);


  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <h1>Series & Movie</h1>
            <div className={styles.searchContainer}>
              <input
                placeholder="Search... "
                className={styles.inputbox}
                value={input}
                onChange={handleInput}
              />
              <img
                className={styles.searchicon}
                src="/searchicon.png"
                alt="search"
              />
            </div>
          </div>
          <div className={styles.card_section}>
            {filteredData.map((curElem, ind) => {
              return <MovieCard key={ind} {...curElem} />;
            })}
          </div>
        </div>
        { slide < main_data.length &&
          <div ref={ref} className={styles.loadingState}>
            Loading...
          </div>
        }
      </section>
    </>
  );
};

export default Movie;
