import { CompositeLayer } from 'deck.gl';

import SlideBase from 'src/scrollyline/slides/SlideBase';
import SlideExample1 from 'src/scrollyline/slides/SlideExample1';
import SlideExample2 from 'src/scrollyline/slides/SlideExample2';
import SlideExample3 from 'src/scrollyline/slides/SlideExample3';

export default class Slides extends CompositeLayer {
  renderLayers() {
    return [
      new SlideBase(this.props),
      new SlideExample1(this.props),
      new SlideExample2(this.props),
      new SlideExample3(this.props),
    ];
  }
}

Slides.layerName = 'Slides';
Slides.defaultProps = {
  ...CompositeLayer.defaultProps,
  autoHighlight: true,
};
