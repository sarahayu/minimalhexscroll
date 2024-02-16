import { OBJLoader } from '@loaders.gl/obj';
import { CompositeLayer } from 'deck.gl';
import AnimatedIconHexTileLayer from 'src/hextile/AnimatedIconHexTileLayer';
import SolidHexTileLayer from 'src/hextile/SolidHexTileLayer';
import {
  colorInterpGW,
  valueInterpDemand,
  valueInterpUnmet,
} from 'src/utils/scales';
import { inRange } from 'src/utils/settings';

export default class SlideExample2 extends CompositeLayer {
  renderLayers() {
    const { data, slide, counter } = this.props;

    return [
      new SolidHexTileLayer({
        id: `GroundwaterLayer`,
        data,
        thicknessRange: [0, 1],
        filled: true,
        getFillColor: (d) =>
          colorInterpGW(
            d.properties.Groundwater[
              slide <= 2 ? counter : slide <= 4 ? 1026 : 1197
            ]
          ),
        visible: inRange(slide, 1, 6),
        opacity: slide >= 2 ? 0.2 : 0,
        transitions: {
          opacity: 250,
        },
        updateTriggers: {
          getFillColor: [counter, slide],
        },
      }),
      new AnimatedIconHexTileLayer({
        id: `UnmetDemandIcons1026`,
        data,
        loaders: [OBJLoader],
        mesh: 'assets/drop.obj',
        raised: true,
        extruded: false,
        sizeScale: 3000,
        getColor: inRange(slide, 2, 3) ? [255, 130, 35] : [255, 130, 35],
        getValue:
          slide == 2 || slide == 5
            ? () => 0
            : slide == 3
            ? (d) => valueInterpDemand(d.properties.DemandBaseline[1026])
            : (d) => valueInterpUnmet(d.properties.UnmetDemandBaseline[1026]),
        visible: inRange(slide, 2, 5),
      }),
      new AnimatedIconHexTileLayer({
        id: `UnmetDemandIcons1197`,
        data,
        loaders: [OBJLoader],
        mesh: 'assets/drop.obj',
        raised: true,
        extruded: false,
        sizeScale: 3000,
        getColor: inRange(slide, 4, 5) ? [255, 130, 35] : [255, 130, 35],
        getValue:
          slide == 4 || slide == 7
            ? () => 0
            : slide == 5
            ? (d) => valueInterpDemand(d.properties.DemandBaseline[1197])
            : (d) => valueInterpUnmet(d.properties.UnmetDemandBaseline[1197]),
        visible: inRange(slide, 4, 7),
      }),
    ];
  }
}

SlideExample2.layerName = 'SlideExample2';
SlideExample2.defaultProps = {
  ...CompositeLayer.defaultProps,
};
