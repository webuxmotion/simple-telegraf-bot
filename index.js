require('dotenv').config()
const Telegraf = require(`telegraf`)

const { BOT_TOKEN, URL } = process.env;
const PORT = process.env.PORT || 80;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Welcome!`))
bot.help((ctx) => ctx.reply(`Send me a sticker`))
bot.on(`sticker`, (ctx) => ctx.reply(`👍`))
bot.hears(`hi`, (ctx) => ctx.reply(`Hey there`))

if (process.env.NODE_ENV === 'production') {
    bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
    bot.startWebhook(`bot${BOT_TOKEN}'`, null, PORT);
    console.log('Started with webhook');
} else {
    bot.launch()
        .then((res) => console.log(`Launched at ${new Date()}`))
        .catch((err) => console.log(`ERROR at launch:`, err))
}

