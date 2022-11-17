require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getRandomSign, getResult } = require('./lib/rps');


const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, 'Ваш ход',
    {
        "reply_markup": {
            "inline_keyboard": [[
                {
                    text: '✊ rock',
                    callback_data: 't,rock',
                },
                {
                    text: '✋ paper',
                    callback_data: 't,paper',
                },
                {
                    text: '✌️ scissors',
                    callback_data: 't,scissors',
                },
            ]],

        },
    })
});
const score = [0,0]
bot.on('callback_query', (query) => {
    try {
        const chatId = query.from.id
        const [prefix] = query.data.split(',')

        if (prefix === 't') {
            const [,choose] = query.data.split(',')
            const enemyChoose = getRandomSign()
            const [points, enemyPoints, info] = getResult(choose, enemyChoose)
            bot.sendMessage(chatId, `Вы выбрали ${choose}. Я выбрал ${enemyChoose}`)
            bot.sendMessage(chatId, info)
        }

    } catch (error) {
        console.log(error)
    }
})
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, 'Received your message');
// });
// Текст - Ничья-Победа-Поражение и вывод обоих ходов
// Обновление счета и его вывод
// Кнопка - Новая Игра
