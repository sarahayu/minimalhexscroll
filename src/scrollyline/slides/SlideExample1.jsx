import { OBJLoader } from '@loaders.gl/obj';
import { CompositeLayer } from 'deck.gl';
import IconHexTileLayer from 'src/hextile/IconHexTileLayer';
import { valueInterpDemand } from 'src/utils/scales';

export default class SlideExample1 extends CompositeLayer {
  renderLayers() {
    const { data, slide, counter } = this.props;

    return [
      new IconHexTileLayer({
        id: `DemandIcons`,
        data,
        loaders: [OBJLoader],
        mesh: 'assets/drop.obj',
        raised: true,
        extruded: false,
        sizeScale: 3000,
        getColor: [255, 130, 35],
        getValue: (d) =>
          valueInterpDemand(d.properties.DemandBaseline[counter]),
        visible: slide == 1,
        updateTriggers: {
          getTranslation: [counter],
        },
      }),
    ];
  }
}

SlideExample1.layerName = 'SlideExample1';
SlideExample1.defaultProps = {
  ...CompositeLayer.defaultProps,
};
