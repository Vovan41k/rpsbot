require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getRandomSign, getResult, newGame, signs } = require('./lib/rps');


const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const startGame = (chatId)=>{
    bot.sendMessage(chatId, 'Ваш ход',
    {
        "reply_markup": {
            "inline_keyboard": [[
                {
                    text: signs.rock,
                    callback_data: 't,rock',
                },
                {
                    text: signs.paper,
                    callback_data: 't,paper',
                },
                {
                    text: signs.scissors,
                    callback_data: 't,scissors',
                },
            ]],

        },
    })

}

bot.onText(/\/start/, (msg, match) => {
    startGame(msg.chat.id)
});
const score = [0, 0]
bot.on('callback_query', (query) => {
    try {
        const chatId = query.from.id
        const [prefix] = query.data.split(',')

        if (prefix === 't') {
            const [, choose] = query.data.split(',')
            const enemyChoose = getRandomSign()
            const [points, enemyPoints, info] = getResult(choose, enemyChoose)
            score[0] += points
            score[1] += enemyPoints
            bot.sendMessage(chatId, `Вы выбрали ${signs[choose]}
Я выбрал ${signs[enemyChoose]}
Результат: ${info}
Счет: ${score.join(`:`)}
`, {
    "reply_markup": {
        "inline_keyboard": [[
            {
                text: 'Новая игра',
                callback_data: 'n,game'
            }
        ]],

    },
})
        } else if(prefix==='n'){
            startGame(chatId)
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
