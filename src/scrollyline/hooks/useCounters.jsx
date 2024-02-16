import { useEffect, useState } from 'react';
import { inRange } from 'src/utils/settings';

export default function useCounters({ slide }) {
  const [counter, setCounter] = useState(1026);
  const [playing, setPlaying] = useState(false);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (inRange(slide, 1, 2)) {
      setCounting(true);
      let timer = setTimeout(() => setCounter((c) => (c + 1) % 1200), 250);
      return function () {
        clearTimeout(timer);
        setCounting(false);
      };
    }
  }, [counter, slide]);

  return {
    counter,
    setCounter,
    playing,
    setPlaying,
    counting,
    setCounting,
  };
}
