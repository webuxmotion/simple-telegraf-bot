const { Telegraf } = require('telegraf');
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { BOT_TOKEN } = process.env;
// const bot = new Telegraf(BOT_TOKEN);
// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('hipster', Telegraf.reply('λ'));
const port = process.env.PORT || 3000;
// bot.launch();





// Handler factoriess
const { enter, leave } = Stage

// Greeter scene
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('Hi'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.hears('hi', enter('greeter'))
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

// Echo scene
const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([greeterScene, echoScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
bot.command('echo', (ctx) => ctx.scene.enter('echo'))
bot.on('message', (ctx) => ctx.reply('Try /echo or /greeter'))







// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch({
    webhook: {
      // Public domain for webhook; e.g.: example.com
      domain: 'https://shrouded-hamlet-06986.herokuapp.com/webhook',
  
      // Port to listen on; e.g.: 8080
      port: port,
  
      // Optional path to listen for.
      // `bot.secretPathComponent()` will be used by default
      hookPath: '/webhook',
  
      // Optional secret to be sent back in a header for security.
      // e.g.: `crypto.randomBytes(64).toString("hex")`
      secretToken: "sdfsdfeeee444545",
    },
  })
      .then((res) => console.log(`Launched at ${new Date()}`))
      .catch((err) => console.log(`ERROR at launch:`, err))