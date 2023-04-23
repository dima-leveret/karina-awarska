import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Headcomponent } from "../../components/HeadComponent";
import { ImagesLightbox } from "../../components/ImagesLightbox";
import { PrimaryButtnom } from "../../components/PrimaryButton";
import styles from "../../styles/Images.module.css";
import { GalleryHeader } from "../../components/GalleryHeader";

import {
  searchAllImages,
  mapImageResources,
  getFolders,
} from "../../lib/cloudinary";

const FolderPath = ({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folderPath,
}) => {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [index, setIndex] = useState(-1);

  const handleLoadMoreImages = async (e) => {
    e.preventDefault();
    const results = await fetch("/api/searchAllImages", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
        max_results: 9,
        expression: `folder=${folderPath}`,
      }),
    }).then((r) => r.json());

    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
  };

  const handleImageClick = (i) => {
    setIndex(i);
  };

  return (
    <div className={styles.pageContainer}>
      <Headcomponent title={`Galeria | ${folderPath}`} />
      {/* <div>
        <Link href="/gallery">Wróć</Link>
        <h4> {folderPath} </h4>
      </div> */}
      <GalleryHeader children={folderPath} />
      <div className={styles.imagesContainer}>
        {images?.map((image, i) => {
          return (
            <div className={styles.image} key={image.asset_id}>
              <Image
                priority
                layout="fill"
                objectFit="cover"
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
};

export default FolderPath;

export const getServerSideProps = async (context) => {
  const { folders } = await getFolders();
  const paths = folders.map((folder) => {
    return {
      params: { folderPath: folder.path },
    };
  });

  const folderPath = context.params.folderPath;
  const results = await searchAllImages({
    max_results: 9,
    expression: `folder=${folderPath}`,
  });

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);
  console.log(images);

  return {
    props: {
      paths: paths,
      fallback: "blocking",

      images,
      nextCursor: nextCursor || null,
      folderPath,
    },
  };
};
