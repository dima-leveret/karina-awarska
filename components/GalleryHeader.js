import Link from "next/link";
import styles from "../styles/components/GalleryHeader.module.css";

export const GalleryHeader = ({ children }) => {
  return (
    <div className={styles.container}>
      <Link href="/gallery">Wróć</Link>
      <h4> {children} </h4>
    </div>
  );
};
