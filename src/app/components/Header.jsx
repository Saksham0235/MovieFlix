import styles from "@/app/styles/navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className={styles.main_header}>
      <div className={styles.navbar_brand}>
        <Link href="/">
          <Image src="/logo.jpeg" width={200} height={100} alt="Logo" />
        </Link>
      </div>

      <Nav />
    </header>
  );
};

export default Header;
