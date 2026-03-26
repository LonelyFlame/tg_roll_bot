import { DiceRoll } from '@dice-roller/rpg-dice-roller';

import { FORMULA_ERROR, IMAGE_LINK_TEMPLATE } from './templates.js';
import { D20 } from './constants.js';

const regexp = /\{(\w+)\}/g;

export const template = (
  str: string,
  params: Record<string, string | number | undefined>,
): string => str.replace(regexp, (_, key) => String(params[key] || ''));

export const getMessageText = (formula: string, isD20?: boolean): string => {
  let roll: DiceRoll;
  try {
    roll = new DiceRoll(formula);
  } catch (e) {
    return template(FORMULA_ERROR, { formula });
  }

  let imageLinkTemplate = '';
  const imageLink = D20[roll.total - 1];
  if (isD20 && imageLink) {
    imageLinkTemplate = template(IMAGE_LINK_TEMPLATE, { imageLink });
  }

  return `${imageLinkTemplate}\`${roll.output}\``;
};
