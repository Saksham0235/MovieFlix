"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/common.module.css";
import Image from "next/image";
import Loading from "@/app/Loading";

const page = ({ params }) => {
  const id=params.id
  const [data, setData] = useState(null);
  const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8d3995a30amsh224fdfbc143be4bp1543b8jsn5ae84b795e3f',
      'x-rapidapi-host': 'netflix54.p.rapidapi.com'
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result[0]?.details);
        setData(result[0].details);
      } catch (err) {
        console.log("Error in getting the data of the id", err);
      }
    };

    fetchData();
  }, [id]);
  if (!data) {
    return(
      <Loading/>
    )
  }
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.movie_title}>
          Netflix \<span>{data.type}</span>
        </h2>
        <div className={styles.card_section}>
          <div>
            <Image
              src={data.backgroundImage.url}
              alt={data.title}
              width={600}
              height={300}
              style={{borderRadius:'10px'}}
            />
          </div>
          <div>
            <h1>{data.title}</h1>
            <p>{data.synopsis}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
