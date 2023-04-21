import { Headcomponent } from "../../components/HeadComponent";
import Link from "next/link";
import { getFolders } from "../../lib/cloudinary";

export default function Gallery({ folders }) {
  return (
    <div>
      <Headcomponent title="Geleria" />
      <h4>Galeria</h4>
      <h4>Foldery</h4>
      <div>
        <Link href="/gallery/allImages">
          <button>Wszystkie</button>
        </Link>
        {folders.map((folder) => (
          <Link key={folder.path} href={`/gallery/${folder.path}`}>
            <button key={folder.path}>{folder.name}</button>
          </Link>
        ))}
      </div>
    </div>
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
