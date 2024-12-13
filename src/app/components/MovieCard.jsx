import Image from "next/image";
import React from "react";
import styles from "@/app/styles/common.module.css";
import Link from "next/link";

const MovieCard = (currele) => {
  const { id, title, synopsis, type } = currele.jawSummary;
  console.log(currele.jawSummary, "Image Path");
  console.log(currele.jawSummary.backgroundImage.url, "From imge url");
  return (
    <>
      <div className={styles.card} key={id}>
        <div className={styles.card_image}>
          <Image
            src={currele.jawSummary.backgroundImage.url}
            alt={title}
            width={260}
            height={200}
          />
        </div>
        <div className={styles.card_data}>

        
        <h2>{title.substring(0, 18)}</h2>
        <p>{`${synopsis.substring(0, 66)} ...`}</p>
        <Link href={`/movies/${id}`}>
          <button>Read More</button>
        </Link>
      </div>
      </div>  
    </>
  );
};

export default MovieCard;
