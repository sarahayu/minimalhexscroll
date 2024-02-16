import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';
import { Map } from 'react-map-gl';
import mapStyle from 'src/assets/style.json';

import Slides from 'src/scrollyline/Slides';
import MainGUI from 'src/scrollyline/MainGUI';

import useCounters from 'src/scrollyline/hooks/useCounters';
import useHexTooltip from 'src/scrollyline/hooks/useHexTooltip';
import useScroller from 'src/scrollyline/hooks/useScroller';

import { temporalDataHex as data } from 'src/utils/data';
import { INITIAL_VIEW_STATE, LIGHTING } from 'src/utils/settings';

export default function Scrollyline() {
  const [slide, setSlide] = useState(0);

  const counters = useCounters({ slide });
  const { getTooltip } = useHexTooltip({ slide, ...counters });
  const { scrollPercent } = useScroller({ setSlide });

  const layers = [
    new Slides({
      data,
      slide,
      setSlide,
      ...counters,
    }),
  ];

  return (
    <>
      <DeckGL
        layers={layers}
        effects={[LIGHTING]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ scrollZoom: false }}
        getTooltip={getTooltip}
      >
        <Map
          reuseMaps
          mapLib={maplibregl}
          mapStyle={mapStyle}
          preventStyleDiffing={true}
        />
      </DeckGL>
      <MainGUI {...{ slide, ...counters }} />
      <Scroller scrollPercent={scrollPercent} />
    </>
  );
}

function Scroller({ scrollPercent }) {
  return (
    <div
      className="scroll-indic"
      style={{
        transform: `translateY(${scrollPercent * 100}%)`,
      }}
    ></div>
  );
}
