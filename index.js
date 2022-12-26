const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('λ'));
bot.launch();

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
      hookPath: 'webhook',
  
      // Optional secret to be sent back in a header for security.
      // e.g.: `crypto.randomBytes(64).toString("hex")`
      secretToken: "sdfsdfeeee444545",
    },
  })
      .then((res) => console.log(`Launched at ${new Date()}`))
      .catch((err) => console.log(`ERROR at launch:`, err))