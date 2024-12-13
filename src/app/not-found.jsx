import styles from "@/app/styles/common.module.css";
import herostyles from '@/app/styles/hero.module.css'
import Link from "next/link";

const NotFound = () => {
  return (
    <section className={styles.error_section}>
      <div className={styles.error_page}>
        <h1>Oooops.....</h1>
        <h2>That Page Cannot be Found</h2>
        <Link href="/">
          <button className={styles.error_btn}>Go To Home Page</button>
        </Link>
      </div>
      <div className={herostyles["custom-shape-divider-bottom-1681647578"]}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className={herostyles["shape-fill"]}
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default NotFound;
