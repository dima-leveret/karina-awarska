import { Headcomponent } from "../../components/HeadComponent";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagesLightbox } from "../../components/ImagesLightbox";
import { PrimaryButtnom } from "../../components/PrimaryButton";
import styles from "../../styles/Images.module.css";

import { searchAllImages, mapImageResources } from "../../lib/cloudinary";

export default function AllImages({
  images: defaultImages,
  nextCursor: defaultNextCursor,
}) {
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
      <Headcomponent title="Geleria | Wszystkie" />
      <div>
        <Link href="/gallery">Wróć</Link>
        <h4>Wszystkie zdjęcia</h4>
      </div>
      <div className={styles.imagesContainer}>
        {images.map((image, i) => {
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
        <span> To są wszystkie zdjęcia które obecnie mam 😃</span>
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
  });

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: {
      images,
      nextCursor: nextCursor || null,
    },
  };
}
