import { useCallback, useEffect, useState } from 'react';
import { dateInterpIdx } from 'src/utils/scales';
import {
  COWS_OUT_VIEW_STATE,
  COWS_VIEW_STATE,
  INITIAL_VIEW_STATE,
  PROJ_VIEW_STATE,
} from 'src/utils/settings';

export default function useCamera({ slide }) {
  const [curViewState, setCurViewState] = useState(INITIAL_VIEW_STATE);
  const [transitioning, setTransitioning] = useState(false);

  const zoomInCows = useCallback(() => {
    setCurViewState({
      ...COWS_VIEW_STATE,
      onTransitionEnd: () => setTransitioning(false),
    });
  }, []);

  const zoomInProj = useCallback(() => {
    setCurViewState({
      ...PROJ_VIEW_STATE,
      onTransitionEnd: () => setTransitioning(false),
    });
  }, []);

  const zoomOutThenProj = useCallback(() => {
    setTransitioning(true);
    setCurViewState({
      ...COWS_OUT_VIEW_STATE,
      onTransitionEnd: zoomInProj,
    });
  }, []);

  useEffect(() => {
    if (slide == 2) {
      setTransitioning(true);
      zoomInCows();
    } else if (slide == 3) {
      zoomOutThenProj();
    }
  }, [slide]);

  return { curViewState, transitioning };
}
