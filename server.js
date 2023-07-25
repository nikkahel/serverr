const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Ваш токен бота, полученный от BotFather
const token = '6545548439:AAGzoqXEPID3A_sAr_UkPJRv0KwCVviLbKs';
const bot = new TelegramBot(token, { polling: true }); // Set polling interval to 1000ms (1 second)

// Создаем веб-приложение с использованием Express.js
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Роут для обработки команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    // Отправляем сообщение с Inline кнопкой "Открыть WebApp"
    bot.sendPhoto(chatId, 'https://wmewww.onrender.com', {
        caption: 'Откройте WebApp',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Открыть WebApp', url: 'https://wmewww.onrender.com' }]
            ]
        }
    });
});

// Запускаем сервер Express на порту 3000
app.listen(3000, () => {
    console.log('Web server started on http://localhost:3000');
});
