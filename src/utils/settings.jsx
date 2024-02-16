import { AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { FlyToInterpolator, LightingEffect } from 'deck.gl';

export const INITIAL_VIEW_STATE = {
  longitude: -121.046040643251,
  latitude: 37.53320315272563,
  zoom: 7.3252675985610685,
  minZoom: 7,
  maxZoom: 15,
  pitch: 50.85,
  bearing: 32.58,
};

export const AMBIENT_LIGHT = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.7,
});

export const DIR_LIGHT = new SunLight({
  timestamp: Date.UTC(2019, 6, 1, 22),
  color: [255, 255, 255],
  intensity: 0.8,
  // _shadow: true
});

export const HOLDERS = {
  0: 'Settlement',
  1: 'Exchange',
  2: 'Project',
  3: 'Non-Project',
};

export const SCENARIOS = {
  0: 'bl_h000',
  1: 'CS3_ALT3_2022med_L2020ADV',
  2: 'LTO_BA_EXP1_2022MED',
};

export const SCENARIO_LABELS = {
  0: 'Scenario 1',
  1: 'Scenario 2',
  2: 'Scenario 3',
};

export function inRange(a, x, y) {
  return a >= x && a <= y;
}

export const LIGHTING = new LightingEffect({
  ambientLight: AMBIENT_LIGHT,
  dirLight: DIR_LIGHT,
});

export const MAX_SLIDE = 7;
