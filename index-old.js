require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(200).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

const Telegraf = require(`telegraf`)


const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Welcome!`))
bot.help((ctx) => ctx.reply(`Send me a sticker`))
bot.on(`sticker`, (ctx) => ctx.reply(`👍`))
bot.hears(`hi`, (ctx) => ctx.reply(`Hey there`))

bot.launch({
  webhook: {
    // Public domain for webhook; e.g.: example.com
    domain: 'https://shrouded-hamlet-06986.herokuapp.com/webhook',

    // Port to listen on; e.g.: 8080
    port: port,

    // Optional path to listen for.
    // `bot.secretPathComponent()` will be used by default
    hookPath: 'webhook',

    // Optional secret to be sent back in a header for security.
    // e.g.: `crypto.randomBytes(64).toString("hex")`
    secretToken: "sdfsdfeeee444545",
  },
})
    .then((res) => console.log(`Launched at ${new Date()}`))
    .catch((err) => console.log(`ERROR at launch:`, err))

// bot.launch()
//     .then((res) => console.log(`Launched at ${new Date()}`))
//     .catch((err) => console.log(`ERROR at launch:`, err))
