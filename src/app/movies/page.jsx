// "use client";
// import React, { useEffect, useState, use } from "react";
// import dotenv from "dotenv";
// import MovieCard from "../components/MovieCard";
// import styles from "@/app/styles/common.module.css";
// import Loading from "../Loading";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// dotenv.config();

// const Movies = () => {
//   const searchParams = useSearchParams();

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "8d3995a30amsh224fdfbc143be4bp1543b8jsn5ae84b795e3f",
//       "x-rapidapi-host": "netflix54.p.rapidapi.com",
//     },
//   };

//   const totalData = 177;
//   const dataPerPage = 8;

//   const totalPages = Math.ceil(totalData / dataPerPage);
//   // Creating offset i.e . the number of items to skip before beginning to collect the result set

//   let currPage = 1;

//   if (Number(searchParams.page) >= 1) {
//     currPage = Number(searchParams.page);
//   }

//   // We have to leave these offset before showing the next data
//   let offset = (currPage - 1) * dataPerPage;
//   let pageNumbers = [];

//   //  Creating loop to generate and show pagenumbers before and after the curr page
//   for (let i = currPage - 3; i <= currPage + 3; i++) {
//     if (i < 1) continue;
//     if (i > totalPages) break;

//     pageNumbers.push(i);
//   }

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(
//           `https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`,
//           options
//         );
//         const result = await response.json();
//         setData(result.titles);
//         setLoading(false);
//       } catch (err) {
//         console.log("Error in fetching the data", err);
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, [offset]);
//   return (
//     <section className={styles.movieSection}>
//       <div className={styles.container}>
//         <h1>Series & Movie</h1>
//         <div className={styles.card_section}>
//           {loading ? (
//             <Loading />
//           ) : (
//             data?.map((currele) => {
//               return <MovieCard {...currele} key={currele?.id} />;
//             })
//           )}
//         </div>
//       </div>

// {data.length > 0 && (
//   <div
//     style={{
//       display: "flex",
//       gap: "2rem",
//       marginTop: "12rem",
//       justifyContent: "center",
//     }}
//   >
//     {currPage - 1 >= 1 && (
//       <>
//         <Link href="/movies">{"<<"}</Link>
//       </>
//     )}
//     {pageNumbers.map((ele) => (
//       <Link
//         key={ele}
//         href={`/movies?page=${ele}`}
//         className={ele === currPage ? styles.activeLink : ""}
//       >
//         {ele}
//       </Link>
//     ))}

//    {currPage + 1 <= totalPages && (
//       <>
//         <Link href="/movies">{">>"}</Link>
//       </>
//     )}
//   </div>
// )}
//     </section>
//   );
// };

// export default Movies;

import React from "react";
import MovieCard from "@/app/components/MovieCard";
import styles from "@/app/styles/common.module.css";
import Link from "next/link";

const Movie = async ({ searchParams }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
      "x-rapidapi-key": "8d3995a30amsh224fdfbc143be4bp1543b8jsn5ae84b795e3f",
      "x-rapidapi-host": "netflix54.p.rapidapi.com",
    },
  };

  const res = await fetch(
    `https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`,
    options
  );
  const data = await res.json();
  const main_data = data.titles;
  console.log(main_data.jawSummary);

  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movie</h1>
          <div className={styles.card_section}>
            {main_data.map((curElem) => {
              return <MovieCard key={curElem.id} {...curElem} />;
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
