import Headcomponent from "../../components/HeadComponent";
import { searchPricesImage, mapImageResources } from "../../lib/cloudinary";

export default function PriceList({ images }) {
  console.log('price image => ', images);

  return (
    <div>
      <Headcomponent title="Cennik usług" />
      <h4>Cennik usług</h4>
      <div>
        {
          images.map(image => <img  
              width={700}
              height={800}
              key={image.asset_id}
              src={image.secure_url} 
            />)
        }
      </div>
    </div>
  );
}

export async function getStaticProps() {

  const results = await searchPricesImage({
    expression: 'folder="kuba-car-wash-prices"'
  })

  const { resources } = results;

  const images = mapImageResources(resources);

  return {
    props: {
      images,
    }
  }
}