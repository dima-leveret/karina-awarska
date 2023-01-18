import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImagesLightbox } from "../../components/ImagesLightbox";

import { FolderImages } from "../../components/FolderImages";

import {
  searchAllImages,
  mapImageResources,
  getFolders,
} from "../../lib/cloudinary";

const FolderPath = ({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folderPath,
  // folders,
}) => {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [index, setIndex] = useState(-1);

  // const [activeFolder, setActiveFolder] = useState(folderPath);

  // useEffect(() => {

  // async function run() {
  //   const results = await fetch("/api/searchAllImages", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       nextCursor,
  //       max_results: 15,
  //       expression: `folder=${activeFolder}`,
  //     }),
  //   }).then((r) => r.json());

  //   const { resources, next_cursor: updatedNextCursor } = results;

  //   const images = mapImageResources(resources);

  //   setImages((prev) => {
  //     return [...prev, ...images];
  //   });

  //   setNextCursor(updatedNextCursor);
  // }

  // }, []);

  const handleLoadMoreImages = async (e) => {
    e.preventDefault();
    const results = await fetch("/api/searchAllImages", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
        max_results: 16,
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

  // const handleOnFolderClick = (folderPath) => {
  //   setActiveFolder(folderPath);
  // };

  const handleImageClick = (i) => {
    setIndex(i);
  };

  return (
    <div>
      <h4> {folderPath} </h4>
      <div>
        <Link href="/gallery">
          <button>Wróć</button>
        </Link>
        {/* {folders?.map((folder) => (
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
        {/* <FolderImages
          images={defaultImages}
          nextCursor={defaultNextCursor}
          folderPath={folderPath}
        /> */}
        {images?.map((image, i) => {
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

      <ImagesLightbox
        index={index}
        slides={images}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default FolderPath;

// export const getStaticPaths = async () => {
//   const { folders } = await getFolders();
//   const paths = folders.map((folder) => {
//     return {
//       params: { folderPath: folder.path },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// };

export const getServerSideProps = async (context) => {
  const { folders } = await getFolders();
  const paths = folders.map((folder) => {
    return {
      params: { folderPath: folder.path },
    };
  });

  const folderPath = context.params.folderPath;
  const results = await searchAllImages({
    max_results: 16,
    expression: `folder=${folderPath}`,
  });

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);
  console.log(images);

  // const { folders } = await getFolders();

  return {
    props: {
      paths: paths,
      fallback: "blocking",

      images,
      nextCursor: nextCursor || null,
      folderPath,
      // folders,
    },
  };
};
