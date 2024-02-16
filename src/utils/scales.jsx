import * as d3 from 'd3';
import { temporalDataHex } from 'src/utils/data';
import { saturate } from 'src/utils/utils';

const STEP_RES = 10;

export const dateInterpIdx = d3
  .scaleTime()
  .domain([new Date('10/31/1921'), new Date('9/30/2021')])
  .range([0, 1199]).invert;

export const resScale = d3
  .scaleLinear()
  .domain([7, 12])
  .range([0, 1])
  .clamp(true);

export const valueInterpUnmet = d3
  .scaleLinear()
  .domain([-150, 0])
  .range([1, 0])
  .clamp(true);

export const valueInterpDemand = d3
  .scaleLinear()
  .domain([0, 150])
  .range([0, 1])
  .clamp(true);

const scaleDemandAverage = d3
  .scaleQuantize()
  .domain(
    d3.extent(
      Object.values(Object.values(temporalDataHex).slice(-1)[0]).map(
        (d) => d['DemandBaselineAverage']
      )
    )
  )
  .range(d3.range(0, 1.001, 1 / STEP_RES));

const scaleGW = d3
  .scaleQuantize()
  .domain([-250, 700])
  .range(d3.range(0, 1.001, 1 / STEP_RES));

export const colorInterpGW = (val) =>
  saturate({
    col: d3
      .interpolateBlues(scaleGW(val))
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((d) => Number(d)),
    saturation: 1.5,
  });

export const colorInterpDemandAverage = (val) =>
  saturate({
    col: d3
      .interpolateGreens(scaleDemandAverage(val))
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((d) => Number(d)),
    saturation: 1,
  });

export const colorDemandAverage = saturate({
  col: colorInterpDemandAverage(scaleDemandAverage.invertExtent(0.5)[0]),
});

export const colorGW = saturate({
  col: colorInterpGW(scaleGW.invertExtent(0.5)[0]),
});
