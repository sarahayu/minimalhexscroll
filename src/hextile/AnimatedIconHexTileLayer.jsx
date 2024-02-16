import * as d3 from 'd3';
import { CompositeLayer, SimpleMeshLayer } from 'deck.gl';
import * as h3 from 'h3-js';
import { resScale, valueInterpDemand } from 'src/utils/scales';
import { FORMATIONS, INTERIM_FORMATIONS } from 'src/utils/utils';

const formationInterp = d3
  .scaleQuantize()
  .domain([0, 1])
  .range(d3.range(0, FORMATIONS.length));

export default class AnimatedIconHexTileLayer extends CompositeLayer {
  initializeState() {
    super.initializeState();
    this.setState({
      hextiles: this.props.data,
      resRange: Object.keys(this.props.data).map((d) => parseInt(d)),
      transitioning: false,
      prevGetValueFn: null,
    });
  }

  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }
  renderLayers() {
    let { hextiles, transitioning, prevGetValueFn, resRange } = this.state;
    const { zoom } = this.context.viewport;

    if (prevGetValueFn === null) {
      this.setState(
        Object.assign(this.state, {
          prevGetValueFn: this.props.getValue,
        })
      );
    } else if (prevGetValueFn !== this.props.getValue && !transitioning) {
      this.setState(
        Object.assign(this.state, {
          transitioning: true,
        })
      );

      transitioning = true;

      setTimeout(() => {
        this.setState(
          Object.assign(this.state, {
            transitioning: false,
            prevGetValueFn: this.props.getValue,
          })
        );
      }, 300);
    }

    let data = [];

    const curRes = d3.scaleQuantize().domain([0, 1]).range(resRange)(
      resScale(zoom)
    );

    let resHex = hextiles[curRes];
    let iconScale =
      h3.getHexagonEdgeLengthAvg(curRes, h3.UNITS.km) /
      h3.getHexagonEdgeLengthAvg(5, h3.UNITS.km);

    Object.keys(resHex).forEach((hexID) => {
      let properties = resHex[hexID];

      const edgeLen =
        h3.edgeLength(h3.originToDirectedEdges(hexID)[0], h3.UNITS.km) * 0.5;
      const [y, x] = h3.cellToLatLng(hexID);

      const id = this.props.getValue
        ? formationInterp(this.props.getValue({ properties }))
        : 1;

      for (let [dx, dy, dz] of this.props.getValue
        ? transitioning
          ? INTERIM_FORMATIONS[formationInterp(prevGetValueFn({ properties }))][
              id
            ]
          : FORMATIONS[id]
        : [[0, 0, 0]]) {
        let [ddx, ddy] = this.props.offset;
        data.push({
          position: [
            x +
              ((dx + ddx) * edgeLen) / (111.32 * Math.cos((y * 3.1415) / 180)),
            y + ((dy + ddy) * edgeLen) / 110.574,
            (typeof this.props.getElevation === 'function'
              ? this.props.getElevation({ properties })
              : this.props.getElevation) +
              dz * 10000,
          ],
          properties,
        });
      }
    });

    return [
      new SimpleMeshLayer(
        this.getSubLayerProps({
          ...{
            data: this.props.data,
            mesh: this.props.mesh,
            texture: this.props.texture,
            textureParameters: this.props.textureParameters,
            getPosition: this.props.getPosition,
            getColor: this.props.getColor,
            getOrientation: this.props.getOrientation,
            getScale: this.props.getScale,
            getTranslation: this.props.getTranslation,
            getTransformMatrix: this.props.getTransformMatrix,
            sizeScale: this.props.sizeScale,
            _useMeshColors: this.props._useMeshColors,
            _instanced: this.props._instanced,
            wireframe: this.props.wireframe,
            material: this.props.material,
            transitions: this.props.transitions,
            updateTriggers: this.props.updateTriggers,
          },

          id: `AnimatedIconHexTileLayer`,
          data,
          getPosition: (d) => d.position,
          sizeScale: this.props.sizeScale * iconScale,
        })
      ),
    ];
  }
}

AnimatedIconHexTileLayer.layerName = 'AnimatedIconHexTileLayer';
AnimatedIconHexTileLayer.defaultProps = {
  ...CompositeLayer.defaultProps,
  ...SimpleMeshLayer.defaultProps,
  getValue: undefined,
  getElevation: () => 0,
  offset: [0, 0],
  transitions: {
    getPosition: {
      duration: 300,
      easing: d3.easeBackOut.overshoot(2),
    },
    getColor: {
      duration: 300,
      easing: d3.easeBackOut.overshoot(2),
    },
  },
};
