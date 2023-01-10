import Headcomponent from "../../components/HeadComponent";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
        max_results: 16,
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
    console.log(i);
  };

  return (
    <div>
      <Headcomponent title="Geleria" />
      <h4>Wszystkie zdjęcia</h4>
      <div>
        {/* <Link href={`/gallery/allImages`}>
          <button>Wszystkie</button>
        </Link> */}
        <Link href="/gallery">
          <button>Wróć</button>
        </Link>
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
      <div>
        {images.map((image, i) => {
          return (
            <Image
              width={300}
              height={300}
              key={image.asset_id}
              src={image.secure_url}
              onClick={() => handleImageClick(i)}
            />
          );
        })}
      </div>
      {nextCursor ? (
        <button onClick={handleLoadMoreImages}>Pokaż wicej zdjęć</button>
      ) : (
        <span> To są wszystkie zdjęcia które obecnie mamy 😃</span>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images}
        render={{
          slide: (image, offset, rect) => {
            const width = Math.round(
              Math.min(rect.width, (rect.height / image.height) * image.width)
            );
            const height = Math.round(
              Math.min(rect.height, (rect.width / image.width) * image.height)
            );

            return (
              <div style={{ position: "relative", width, height }}>
                <Image
                  src={image.secure_url}
                  layout="fill"
                  loading="eager"
                  placeholder="blurDataURL"
                  objectFit="contain"
                  alt={"alt" in image ? image.alt : ""}
                  sizes={
                    typeof window !== "undefined"
                      ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
                      : `${width}px`
                  }
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const results = await searchAllImages({
    max_results: 16,
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
