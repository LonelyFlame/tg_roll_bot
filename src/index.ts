import 'dotenv/config';

import { Telegraf } from 'telegraf';
import type { InlineQueryResultArticle } from 'telegraf/types';

import { getMessageText, template } from './utils.js';
import { TITLE_DICE, TITLE_FORMULA } from './templates.js';

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  throw new Error('Переменная окружения BOT_TOKEN не задана в файле .env');
}

const bot = new Telegraf(TOKEN);

bot.on('inline_query', async (ctx) => {
  const formula = ctx.inlineQuery.query.toLowerCase().trim();

  const results: InlineQueryResultArticle[] = [
    {
      id: `roll_20_${Date.now()}`,
      type: 'article',
      title: template(TITLE_DICE, { faces: 20 }),
      description: `Нажми, чтобы отправить результат броска d20 в чат`,
      input_message_content: {
        message_text: getMessageText('1d20', true),
        parse_mode: 'Markdown'
      }
    },
    {
      id: `roll_100_${Date.now()}`,
      type: 'article',
      title: template(TITLE_DICE, { faces: 100 }),
      description: `Нажми, чтобы отправить результат броска d100 в чат`,
      input_message_content: {
        message_text: getMessageText('1d100'),
        parse_mode: 'Markdown'
      }
    },
    {
      id: `roll_4d6k3_${Date.now()}`,
      type: 'article',
      title: 'Бросить характеристики',
      description: `Нажми, чтобы отправить результат броска 4d6k3 для 6 характеристик в чат`,
      input_message_content: {
        message_text: `${getMessageText('4d6k3')}\n${getMessageText('4d6k3')}\n${getMessageText('4d6k3')}\n${getMessageText('4d6k3')}\n${getMessageText('4d6k3')}\n${getMessageText('4d6k3')}`,
        parse_mode: 'Markdown'
      }
    },
  ];

  if (formula) {
    results.push({
      id: `roll_formula_${Date.now()}`,
      type: 'article',
      title: template(TITLE_FORMULA, { formula }),
      description: `Нажми, чтобы отправить результат броска по формуле в чат`,
      input_message_content: {
        message_text: getMessageText(formula),
        parse_mode: 'Markdown'
      },
    });
  }

  return ctx.answerInlineQuery(results, { cache_time: 0 });
});

function launch() {
  bot.launch()
    .then(() => console.log('Бот запущен!'))
    .catch((err) => {
      console.error('Критическая ошибка при запуске:', err);

      bot.stop();

      launch();
    });
}

launch();
