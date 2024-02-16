import { dateInterpIdx } from 'src/utils/scales';
import { HOLDERS, inRange } from 'src/utils/settings';

export default function useHexTooltip({ slide, counter }) {
  const getTooltip = ({ object }) => {
    if (!object) return;

    let date = inRange(slide, 0, 2)
      ? dateInterpIdx(counter)
      : inRange(slide, 3, 4)
      ? dateInterpIdx(1026)
      : dateInterpIdx(1197);
    let cc = inRange(slide, 0, 2)
      ? counter
      : inRange(slide, 3, 4)
      ? 1026
      : 1197;
    return {
      html: `\
    <div><i>${date.toLocaleString('default', {
      month: 'long',
    })} ${date.toLocaleString('default', { year: 'numeric' })}</i></div>
    <div><b>Demand</b></div>
    <div>${object.properties.DemandBaseline[cc]}</div>
    <div><b>Supply</b></div>
    <div>${
      object.properties.DemandBaseline[cc] +
      object.properties.UnmetDemandBaseline[cc]
    }</div>
    <div><b>Unmet Demand</b></div>
    <div>${-object.properties.UnmetDemandBaseline[cc]}</div>
    <div><b>Groundwater</b></div>
    <div>${object.properties.Groundwater[cc]}</div>
    <div><b>Land Holder</b></div>
    <div>${HOLDERS[object.properties.LandUse[0]]}</div>
`,
    };
  };

  return { getTooltip };
}
