import { useEffect, useState } from "react";

const getViewportState = () => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      prefersReducedMotion: false,
    };
  }

  return {
    isMobile: window.matchMedia("(max-width: 767px)").matches,
    isTablet: window.matchMedia("(max-width: 1023px)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
};

const useViewportMode = () => {
  const [state, setState] = useState(getViewportState);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(max-width: 1023px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setState(getViewportState());
    };

    [mobileQuery, tabletQuery, motionQuery].forEach((query) => {
      query.addEventListener("change", handleChange);
    });

    return () => {
      [mobileQuery, tabletQuery, motionQuery].forEach((query) => {
        query.removeEventListener("change", handleChange);
      });
    };
  }, []);

  return state;
};

export default useViewportMode;
