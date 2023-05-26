import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useMemo,
} from "react";
import styles from "./GalleryLayout.module.scss";
import { calcOptimalBoxes } from "../../lib/gallery";

interface Props {
  gap?: number;
  width?: number | any;
  height?: number | any;
  children: ReactNode;
}

const GalleryLayout = ({ children, width, height, gap = 10 }: Props) => {
  const bestFit = useMemo(() => {
    if (children) {
      return calcOptimalBoxes(
        width,
        height,
        Children.count(children),
        16 / 9,
        gap
      );
    }
  }, [children, width, height, gap]);

  return (
    <div
      className={styles.galleryLayout}
      style={{
        gap: `${gap}px`,
      }}
    >
      {Children.map(children, (child) => {
        if (
          isValidElement(child) &&
          bestFit &&
          bestFit.width &&
          bestFit.height
        ) {
          return cloneElement(child as React.ReactElement<any>, {
            width: bestFit.width,
            height: bestFit.height,
          });
        } else {
          return child;
        }
      })}
    </div>
  );
};

export default GalleryLayout;
