const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
    // Отправляем сообщение с WebApp-кнопкой
    bot.sendMessage(chatId, 'Откройте WebApp', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Открыть WebApp', callback_data: 'open_webapp' }]
            ]
        }
    });
});

// Роут для обработки inline кнопки "Открыть WebApp"
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (query.data === 'open_webapp') {
        // Отправляем веб-приложение
        const webAppUrl = 'https://wmewww.onrender.com'; // Замените на URL вашей HTML страницы
        bot.sendWebApp(chatId, webAppUrl).then(() => {
            // Закрываем веб-приложение
            bot.answerCallbackQuery(query.id);
        }).catch((error) => {
            console.error('Error sending WebApp:', error);
        });
    }
});

// Роут для обработки данных от веб-приложения
app.post('/webapp_data', (req, res) => {
    const { chatId, selectedTime } = req.body;
    // Закрываем веб-приложение
    bot.sendWebAppAction(chatId, 'close');
    // Отправляем пользователю выбранное время
    bot.sendMessage(chatId, `Вы выбрали время: ${selectedTime}`);
    res.send('OK');
});

// Запускаем сервер Express на порту 3000
app.listen(3000, () => {
    console.log('Web server started on http://localhost:3000');
});
