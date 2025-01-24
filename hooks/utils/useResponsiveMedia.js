import { useMemo } from "react";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";

export const useResponsiveMedia = (path) => {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const getSize = () => {
      if (width < 420) return "300";
      if (width < 1520) return "400";
      return "650";
    };

    const getLargeSize = () => {
      if (width < 1520) return "1260";
      return "1880";
    };

    // Check if the path is for a large format image/video
    const isLargeFormat = path.includes("/1880/") || path.includes("/1260/");
    const newSize = isLargeFormat ? getLargeSize() : getSize();

    // Replace the size in the path
    return path.replace(/\/\d+\//, `/${newSize}/`);
  }, [path, width]);
};
