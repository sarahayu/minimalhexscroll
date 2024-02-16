import React from 'react';
import Card from 'src/scrollyline/Card';
import Clock from 'src/Clock';
import { inRange } from 'src/utils/settings';

export default function MainGUI({ slide, counter }) {
  return (
    <>
      <Card slide={slide} transitioning={false} />
      {inRange(slide, 1, 6) && (
        <Clock
          counter={inRange(slide, 3, 6) ? (slide <= 4 ? 1026 : 1197) : counter}
          displayMonth={inRange(slide, 3, 6)}
          dataset={slide == 2 ? 'averageGroundwater' : 'averageDemandBaseline'}
        />
      )}
    </>
  );
}
