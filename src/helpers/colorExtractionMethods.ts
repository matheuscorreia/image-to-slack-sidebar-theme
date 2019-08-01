import Vibrant from 'node-vibrant';
import { lighten, darken, readableColor } from 'polished';

import { ReturnType } from './types';

export type Pallete = ReturnType<Vibrant['palette']>

export const darkMutedAndVibrant = (pallete: Pallete) => {
  const darkMuted = pallete.DarkMuted!.getHex();
  const vibrant = pallete.Vibrant!.getHex();

  const columnBg = darken(0.1, darkMuted);
  const hoverHeaderBg = darkMuted;
  const activeItemBg = vibrant;
  const activeItemTextColor = readableColor(activeItemBg, columnBg);
  const hoverItemBg = lighten(0.1, darkMuted);
  const textColor = readableColor(columnBg);
  const activePresenceColor = vibrant;
  const mentionBadgeColor = vibrant;

  return [
    columnBg,
    hoverHeaderBg,
    activeItemBg,
    activeItemTextColor,
    hoverItemBg,
    textColor,
    activePresenceColor,
    mentionBadgeColor,
  ];
};

export const darkVibrantAndMuted = (pallete: Pallete) => {
  const darkVibrant = pallete.DarkVibrant!.getHex();
  const muted = pallete.Muted!.getHex();

  const columnBg = darken(0.1, darkVibrant);
  const hoverHeaderBg = darkVibrant;
  const activeItemBg = muted;
  const activeItemTextColor = readableColor(activeItemBg, columnBg);
  const hoverItemBg = lighten(0.1, darkVibrant);
  const textColor = readableColor(columnBg);
  const activePresenceColor = muted;
  const mentionBadgeColor = muted;

  return [
    columnBg,
    hoverHeaderBg,
    activeItemBg,
    activeItemTextColor,
    hoverItemBg,
    textColor,
    activePresenceColor,
    mentionBadgeColor,
  ];
};

export const mixEverything = (pallete: Pallete) => {
  const darkVibrant = pallete.DarkVibrant!.getHex();
  const lightVibrant = pallete.LightVibrant!.getHex();
  const vibrant = pallete.Vibrant!.getHex();

  const darkMuted = pallete.DarkMuted!.getHex();
  const lightMuted = pallete.LightMuted!.getHex();
  const muted = pallete.Muted!.getHex();

  const columnBg = vibrant;
  const hoverHeaderBg = darkVibrant;
  const activeItemBg = muted;
  const activeItemTextColor = readableColor(activeItemBg, darkVibrant, darkMuted);
  const hoverItemBg = lighten(0.1, darkVibrant);
  const textColor = readableColor(columnBg);
  const activePresenceColor = lightMuted;
  const mentionBadgeColor = lightVibrant;

  return [
    columnBg,
    hoverHeaderBg,
    activeItemBg,
    activeItemTextColor,
    hoverItemBg,
    textColor,
    activePresenceColor,
    mentionBadgeColor,
  ];
}

export const formatToSlack = (hexColors: string[]) => {
  return hexColors
    .map(c => c.toUpperCase())
    .map(c => isShorthandHex(c) ? shorthandHexToLonghand(c) : c);
}

const hexShorthandRegex = new RegExp(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);

const isShorthandHex = (hexColor: string) => hexShorthandRegex.test(hexColor);

const shorthandHexToLonghand = (shorthandHex: string) => {
  const matchResults = shorthandHex.match(hexShorthandRegex);
  if(!matchResults) return shorthandHex;

  const [r, g, b] = Array.from(matchResults).slice(1);
  return `#${[r,g,b].flatMap(part => Array(2).fill(part)).join('')}`;
};

export const logPallete = (pallete: Pallete) => {
  Object.entries(pallete).forEach(([ name, swatch ]) => {
    const hex = swatch!.getHex();

    console.log(`%c ▇▇▇▇▇▇▇▇▇▇ ${name}`, `color: ${hex}`);
  })
};

export enum ColorExtractionMethodsName {
  darkMutedAndVibrant = 'Dark Muted with Vibrant',
  darkVibrantAndMuted = 'Dark Vibrant with Muted',
  mixEverything = 'Mix Everything',
}

type ColorExtractionMethods = {
  [key: string]: (palette: Pallete) => string[];
} 

export const colorExtractionMethods: ColorExtractionMethods = {
  darkMutedAndVibrant,
  darkVibrantAndMuted,
  mixEverything,
};