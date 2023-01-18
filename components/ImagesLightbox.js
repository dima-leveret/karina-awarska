import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "../styles/components/ImagesLightbox.module.css";

export const ImagesLightbox = ({ index, slides, close }) => {
  return (
    <Lightbox
    className={styles.loghtbox}
      open={index >= 0}
      index={index}
      close={close}
      slides={slides}
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
  );
};
