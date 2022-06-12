import Headcomponent from "../../components/HeadComponent";
import { useState } from "react";

import { searchAllImages, mapImageResources } from "../../lib/cloudinary";

export default function Gallery({ images: defaultImages, nextCursor: defaultNextCursor }) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);

  console.log('images => ', images);
  console.log('nextCursor => ', nextCursor);

  const handleLoadMoreImages = async (e) => {
    e.preventDefault()
    const results = await fetch('/api/searchAllImages', {
      method: "POST",
      body: JSON.stringify({
        nextCursor
      })
    }).then(r => r.json());

    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages(prev => {
      return [
        ...prev,
        ...images
      ]
    });

    setNextCursor(updatedNextCursor);
  }

  return (
    <div>
      <Headcomponent title="Geleria" />
      <h4>Galeria</h4>
      <div>
        {
          images.map(image => {
            return <img
              width={300}
              height={300}
              key={image.asset_id}
              src={image.secure_url}
            />
          })
        }
      </div>
      {
        nextCursor
        ?
        <button onClick={handleLoadMoreImages}>Pokaż wicej zdjęć</button>
        :
        <span> To są wszystkie zdjęcia które obecnie mamy 😃</span>
      }
    </div>
  );
}


export async function getStaticProps() {

  const results = await searchAllImages()

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources)

  return {
    props: {
      images,
      nextCursor: nextCursor || null
    }
  }
}
