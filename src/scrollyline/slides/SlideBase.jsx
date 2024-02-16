import { BitmapLayer, CompositeLayer, TerrainLayer, TileLayer } from 'deck.gl';
import { _TerrainExtension as TerrainExtension } from '@deck.gl/extensions';
import SolidHexTileLayer from 'src/hextile/SolidHexTileLayer';

export default class SlideBase extends CompositeLayer {
  renderLayers() {
    return [
      new TileLayer({
        data: 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png',

        minZoom: 7,
        maxZoom: 11,
        tileSize: 256,
        zoomOffset: -1,

        renderSubLayers: (props) => {
          const {
            bbox: { west, south, east, north },
          } = props.tile;

          return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north],
          });
        },
      }),
      new SolidHexTileLayer({
        id: `HoverTilesLayer`,
        data: this.props.data,
        thicknessRange: [0, 1],
        filled: true,

        extruded: false,
        raised: false,
        getFillColor: [0, 0, 0, 0],
        pickable: true,
        autoHighlight: true,
      }),
    ];
  }
}

SlideBase.layerName = 'SlideBase';
SlideBase.defaultProps = {
  ...CompositeLayer.defaultProps,
};
