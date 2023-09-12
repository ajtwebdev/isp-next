import ClassName from "models/classname";

import styles from "./Image.module.scss";
import { Lightbox } from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Image = ({
  children,
  className,
  width = "100%",
  height = "auto",
  src,
  alt,
  srcSet,
  sizes,
  allImages,
  dangerouslySetInnerHTML,
  index,
}) => {
  const imageClassName = new ClassName(styles.image);
  imageClassName.addIf(className, className);
  const slidesImages = allImages?.map(({ sourceUrl, title }) => ({
    src: sourceUrl,
    title: title,
  }));
  const [openLightBox, setOpenLightbox] = useState(false);
  const handleLightBox = () => {
    setOpenLightbox(true);
  };
  return (
    <>
      <figure className={imageClassName.toString()}>
        <div style={{ cursor: "pointer" }} onClick={() => handleLightBox()}>
          <img
            width={width}
            height={height}
            src={src}
            alt={alt || ""}
            srcSet={srcSet}
            sizes={sizes}
          />
        </div>
        {children && <figcaption>{children}</figcaption>}
        {dangerouslySetInnerHTML && (
          <figcaption
            dangerouslySetInnerHTML={{
              __html: dangerouslySetInnerHTML,
            }}
          />
        )}
      </figure>
      {allImages && (
        <Lightbox
          index={index}
          plugins={[Video, Zoom]}
          open={openLightBox}
          close={() => setOpenLightbox(false)}
          slides={slidesImages}
        />
      )}
    </>
  );
};

export default Image;
