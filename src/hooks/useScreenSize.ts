import { useEffect, useState } from "react";
interface Screen {
  width: number;
  height: number;
}

export const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState<Screen>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const resizeHandle = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", resizeHandle);

    resizeHandle();

    return () => window.removeEventListener("resize", resizeHandle);
  }, []);
  return windowSize;
};
