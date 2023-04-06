import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "../styles/components/Header.module.css";

const Header = () => {
  const [isNavBarCtive, setIsNavBarActive] = useState(false);
  const [body, setBody] = useState();

  const openNavBar = () => {
    setIsNavBarActive(!isNavBarCtive);
    body.classList.toggle("_lock");
  };

  const closeNavBar = () => {
    setIsNavBarActive(false);
    body.classList.remove("_lock");
  };

  useEffect(() => {
    const body = document.body;
    setBody(body);
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo} onClick={closeNavBar}>
          <h1>Karina Awarska</h1>
        </a>
      </Link>

      <div
        className={isNavBarCtive ? styles.navBarActive : styles.navBar}
        onClick={closeNavBar}
      >
        <nav className={styles.nav}>
          <Link href="/">
            <a>Strona główna</a>
          </Link>

          <Link href="/gallery">
            <a>Geleria</a>
          </Link>

          <Link href="/coaching">
            <a>Coaching</a>
          </Link>

          <Link href="/contact">
            <a>Kontakt</a>
          </Link>
        </nav>
      </div>

      <div
        onClick={openNavBar}
        className={isNavBarCtive ? styles.menuIconActive : styles.menuIcon}
      >
        <span></span>
      </div>
    </header>
  );
};

export default Header;
