import { useEffect, useState, useRef } from 'react';
import { MAX_SLIDE } from 'src/utils/settings';

const SCROLL_MULT = 10000;

export default function useScroller({ setSlide }) {
  const [scrollIdx, setScrollIdx] = useState(0);
  const scrollIdxRef = useRef(0);

  useEffect(() => {
    window.addEventListener('wheel', (e) => {
      setScrollIdx(
        (s) =>
          (scrollIdxRef.current = Math.min(
            MAX_SLIDE * SCROLL_MULT,
            Math.max(0, s + e.deltaY)
          ))
      );

      setSlide(() =>
        Math.min(
          MAX_SLIDE,
          Math.max(0, Math.floor(scrollIdxRef.current / SCROLL_MULT))
        )
      );
    });
  }, []);

  return {
    scrollPercent: (scrollIdx % SCROLL_MULT) / SCROLL_MULT,
  };
}
