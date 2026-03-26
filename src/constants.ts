import type { TDice } from './types.js'

export const NOTATION_GUIDE = 'https://dice-roller.github.io/documentation/guide/notation';

export const D20: TDice = [
  process.env.D20_1 || '',
  process.env.D20_2 || '',
  process.env.D20_3 || '',
  process.env.D20_4 || '',
  process.env.D20_5 || '',
  process.env.D20_6 || '',
  process.env.D20_7 || '',
  process.env.D20_8 || '',
  process.env.D20_9 || '',
  process.env.D20_10 || '',
  process.env.D20_11 || '',
  process.env.D20_12 || '',
  process.env.D20_13 || '',
  process.env.D20_14 || '',
  process.env.D20_15 || '',
  process.env.D20_16 || '',
  process.env.D20_17 || '',
  process.env.D20_18 || '',
  process.env.D20_19 || '',
  process.env.D20_20 || '',
];
