import Headcomponent from "../../components/HeadComponent";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagesLightbox } from "../../components/ImagesLightbox";
import { PrimaryButtnom } from "../../components/PrimaryButton";
import styles from "../../styles/Images.module.css";

import {
  searchAllImages,
  mapImageResources,
  //   getFolders,
} from "../../lib/cloudinary";

export default function AllImages({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  //   folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [index, setIndex] = useState(-1);

  //   const [activeFolder, setActiveFolder] = useState("");

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

  const handleLoadMoreImages = async (e) => {
    e.preventDefault();
    const results = await fetch("/api/searchAllImages", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
        max_results: 9,
        // expression: `folder=${activeFolder}`,
      }),
    }).then((r) => r.json());

    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
  };

  //   const handleOnFolderClick = async (folderPath) => {
  //     setActiveFolder(folderPath);
  //     setImages([]);
  //     setNextCursor(undefined);
  //   };

  const handleImageClick = (i) => {
    setIndex(i);
  };

  return (
    <div className={styles.pageContainer}>
      <Headcomponent title="Geleria" />
      <h4>Wszystkie zdjęcia</h4>
      <div>
        {/* <Link href={`/gallery/allImages`}>
          <button>Wszystkie</button>
        </Link> */}
        <Link href="/gallery">Wróć</Link>
        {/* {folders.map((folder) => (
          <Link key={folder.path} href={`/gallery/${folder.path}`}>
            <button
              onClick={() => handleOnFolderClick(folder.path)}
              key={folder.path}
            >
              {folder.name}
            </button>
          </Link>
        ))} */}
      </div>
      <div className={styles.imagesContainer}>
        {images.map((image, i) => {
          return (
            <div className={styles.image} key={image.asset_id}>
              <Image
                priority
                layout="fill"
                objectFit="contain"
                src={image.secure_url}
                onClick={() => handleImageClick(i)}
              />
            </div>
          );
        })}
      </div>
      {nextCursor ? (
        <PrimaryButtnom onClick={handleLoadMoreImages}>
          Pokaż wicej
        </PrimaryButtnom>
      ) : (
        <span> To są wszystkie zdjęcia które obecnie mamy 😃</span>
      )}

      <ImagesLightbox
        index={index}
        slides={images}
        close={() => setIndex(-1)}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const results = await searchAllImages({
    max_results: 9,
    // expression: 'folder=""'
  });

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  //   const { folders } = await getFolders();
  //   console.log(folders);

  return {
    props: {
      images,
      nextCursor: nextCursor || null,
      //   folders,
    },
  };
}
