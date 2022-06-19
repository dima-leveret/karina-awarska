import { useState, useEffect } from "react";
import Link from "next/link";

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
        max_results: 15,
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
        {images?.map((image) => {
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
      )}
    </div>
  );
};

export default FolderPath;

export const getStaticPaths = async () => {
  const { folders } = await getFolders();
  const paths = folders.map((folder) => {
    return {
      params: { folderPath: folder.path },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const folderPath = context.params.folderPath;
  const results = await searchAllImages({
    max_results: 15,
    expression: `folder=${folderPath}`,
  });

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);
  console.log(images);

  // const { folders } = await getFolders();

  return {
    props: {
      images,
      nextCursor: nextCursor || null,
      folderPath,
      // folders,
    },
  };
};
