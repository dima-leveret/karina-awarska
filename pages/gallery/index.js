import { Headcomponent } from "../../components/HeadComponent";
import Link from "next/link";
import { getFolders } from "../../lib/cloudinary";
import styles from "../../styles/Folders.module.css";

export default function Gallery({ folders }) {
  return (
    <>
      <Headcomponent title="Geleria" />
      <h4>Foldery</h4>
      <div className={styles.foldersContainer}>
        <Link href="/gallery/allImages">
          <span className={styles.folder}>Wszystkie</span>
        </Link>
        {folders.map((folder) => (
          <Link key={folder.path} href={`/gallery/${folder.path}`}>
            <span className={styles.folder}>{folder.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { folders } = await getFolders();

  return {
    props: {
      folders,
    },
  };
}
