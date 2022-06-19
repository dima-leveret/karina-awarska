import { useState, useEffect } from "react";
import {
    mapImageResources,
  } from "../lib/cloudinary";

export const FolderImages = ({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folderPath
}) => {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState(folderPath);
  console.log("active folder =>", activeFolder);

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

  return (
    <div>
      <span>Folder images</span>
      <div>
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
