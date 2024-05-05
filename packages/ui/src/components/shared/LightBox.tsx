import { useEffect } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import NextJsImage from "./NextJsImage";
// ----------------------------------------------------------------------

export default function LightboxModal({
  images,
  photoIndex,
  setPhotoIndex,
  isOpen,
  onCloseRequest,
}: {
  images: string[];
  photoIndex: number;
  setPhotoIndex: (index: number) => void;
  isOpen: boolean;
  onCloseRequest: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const slides: SlideImage[] | undefined = images?.map((image) => ({
    src: image,
  }));

  return (
    <>
      {isOpen && (
        <Lightbox
          open={isOpen}
          plugins={[Slideshow, Fullscreen, Zoom]}
          index={photoIndex}
          close={onCloseRequest}
          render={{ slide: NextJsImage }}
          slides={slides}
          animation={{
            navigation: 10,

            fade: 10,
            zoom: 10,
          }}
        />
      )}
    </>
  );
}
