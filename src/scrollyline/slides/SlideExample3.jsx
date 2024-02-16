import { OBJLoader } from '@loaders.gl/obj';
import { CompositeLayer } from 'deck.gl';
import IconHexTileLayer from 'src/hextile/IconHexTileLayer';
import { dataFilter } from 'src/utils/utils';

export default class SlideExample3 extends CompositeLayer {
  renderLayers() {
    const { data, slide } = this.props;

    return [
      new IconHexTileLayer({
        id: `SettlementIconsLayer`,
        data: dataFilter(data, (d) => d.LandUse[0] == 0),
        loaders: [OBJLoader],
        mesh: 'assets/dam.obj',
        getColor: [255, 127, 206],
        sizeScale: 0.8 * 500,
        visible: slide == 7,
      }),
      new IconHexTileLayer({
        id: `ExhangeIconsLayer`,
        data: dataFilter(data, (d) => d.LandUse[0] == 1),
        loaders: [OBJLoader],
        mesh: 'assets/cow.obj',
        getColor: [255, 127, 206],
        sizeScale: 0.8 * 550,
        visible: slide == 7,
      }),
      new IconHexTileLayer({
        id: `ProjectIconsLayer`,
        data: dataFilter(data, (d) => d.LandUse[0] == 2),
        loaders: [OBJLoader],
        mesh: 'assets/project.obj',
        getColor: [255, 127, 206],
        sizeScale: 0.8 * 180,
        visible: slide == 7,
      }),
      new IconHexTileLayer({
        id: `NonProjectIconsLayer`,
        data: dataFilter(data, (d) => d.LandUse[0] == 3),
        loaders: [OBJLoader],
        mesh: 'assets/nonproject.obj',
        getColor: [255, 127, 206],
        sizeScale: 0.8 * 140,
        visible: slide == 7,
      }),
    ];
  }
}

SlideExample3.layerName = 'SlideExample3';
SlideExample3.defaultProps = {
  ...CompositeLayer.defaultProps,
};
