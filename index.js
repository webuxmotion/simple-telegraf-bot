require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(200).send('Something broke!')
})

const Telegraf = require(`telegraf`)


const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Welcome!`))
bot.help((ctx) => ctx.reply(`Send me a sticker`))
bot.on(`sticker`, (ctx) => ctx.reply(`👍`))
bot.hears(`hi`, (ctx) => ctx.reply(`Hey there`))

bot.launch()
    .then((res) => console.log(`Launched at ${new Date()}`))
    .catch((err) => console.log(`ERROR at launch:`, err))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })