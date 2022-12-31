import Headcomponent from "../../components/HeadComponent";
// import { useState } from "react";

import Link from "next/link";

import {
  // searchAllImages,
  // mapImageResources,
  getFolders,
} from "../../lib/cloudinary";

export default function Gallery({
  // images: defaultImages,
  // nextCursor: defaultNextCursor,
  folders,
}) {
  // const [images, setImages] = useState(defaultImages);
  // const [nextCursor, setNextCursor] = useState(defaultNextCursor);

  // const [activeFolder, setActiveFolder] = useState("");

  // console.log("images => ", images);
  // console.log("nextCursor => ", nextCursor);

  // useEffect(() => {
  //   (
  //     async function run() {
  //       const results = await fetch("/api/searchAllImages", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           nextCursor,
  //           max_results: 15,
  //           expression: `folder=${activeFolder}`
  //         }),
  //       }).then((r) => r.json());

  //       const { resources, next_cursor: updatedNextCursor } = results;

  //       const images = mapImageResources(resources);

  //       setImages((prev) => {
  //         return [...prev, ...images];
  //       });

  //       setNextCursor(updatedNextCursor);
  //     }
  //   )()
  // }, [activeFolder])

  // const handleLoadMoreImages = async (e) => {
  //   e.preventDefault();
  //   const results = await fetch("/api/searchAllImages", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       nextCursor,
  //       max_results: 15,
  //       // expression: `folder=${activeFolder}`,
  //     }),
  //   }).then((r) => r.json());

  //   const { resources, next_cursor: updatedNextCursor } = results;

  //   const images = mapImageResources(resources);

  //   setImages((prev) => {
  //     return [...prev, ...images];
  //   });

  //   setNextCursor(updatedNextCursor);
  // };

  // const handleOnFolderClick = async (folderPath) => {
  //   setActiveFolder(folderPath);
  //   setImages([]);
  //   setNextCursor(undefined);
  // };

  return (
    <div>
      <Headcomponent title="Geleria" />
      <h4>Galeria</h4>
      <h4>Foldery</h4>
      <div>
        <Link href={`/gallery/allImages`}>
          <button>Wszystkie</button>
        </Link>
        {folders.map((folder) => (
          <Link key={folder.path} href={`/gallery/${folder.path}`}>
            <button
              // onClick={() => handleOnFolderClick(folder.path)}
              key={folder.path}
            >
              {folder.name}
            </button>
          </Link>
        ))}
      </div>
      {/* <div>
        {images.map((image) => {
          return (
            <img
              width={300}
              height={300}
              key={image.asset_id}
              src={image.secure_url}
            />
          );
        })}
      </div>
      {nextCursor ? (
        <button onClick={handleLoadMoreImages}>Pokaż wicej zdjęć</button>
      ) : (
        <span> To są wszystkie zdjęcia które obecnie mamy 😃</span>
      )} */}
    </div>
  );
}

export async function getServerSideProps() {
  // const results = await searchAllImages({
  //   max_results: 15,
  //   expression: 'folder=""'
  // });

  // const { resources, next_cursor: nextCursor } = results;

  // const images = mapImageResources(resources);

  const { folders } = await getFolders();
  // console.log(folders);

  return {
    props: {
      // images,
      // nextCursor: nextCursor || null,
      folders,
    },
  };
}
