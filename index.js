require('dotenv').config()

const { Telegraf, Markup } = require('telegraf');

const { BOT_TOKEN } = process.env;
// const bot = new Telegraf(BOT_TOKEN);
// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('hipster', Telegraf.reply('λ'));
const port = process.env.PORT || 3000;
// bot.launch();


const bot = new Telegraf(BOT_TOKEN);

bot.use(Telegraf.log());

bot.command("onetime", ctx =>
	ctx.reply(
		"One time keyboard",
		Markup.keyboard(["/simple", "/inline", "/pyramid"]).oneTime().resize(),
	),
);

bot.command("custom", async ctx => {
	return await ctx.reply(
		"Custom buttons keyboard",
		Markup.keyboard([
			["🔍 Search", "😎 Popular"], // Row1 with 2 buttons
			["☸ Setting", "📞 Feedback"], // Row2 with 2 buttons
			["📢 Ads", "⭐️ Rate us", "👥 Share"], // Row3 with 3 buttons
		])
			.oneTime()
			.resize(),
	);
});

bot.hears("🔍 Search", ctx => ctx.reply("Yay!"));
bot.hears("📢 Ads", ctx => ctx.reply("Free hugs. Call now!"));

bot.command("special", ctx => {
	return ctx.reply(
		"Special buttons keyboard",
		Markup.keyboard([
			Markup.button.contactRequest("Send contact"),
			Markup.button.locationRequest("Send location"),
		]).resize(),
	);
});

bot.command("pyramid", ctx => {
	return ctx.reply(
		"Keyboard wrap",
		Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
			wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
		}),
	);
});

bot.command("simple", ctx => {
	return ctx.replyWithHTML(
		"<b>Coke</b> or <i>Pepsi?</i>",
		Markup.keyboard(["Coke", "Pepsi"]),
	);
});

bot.command("inline", ctx => {
	return ctx.reply("<b>Coke</b> or <i>Pepsi?</i>", {
		parse_mode: "HTML",
		...Markup.inlineKeyboard([
			Markup.button.callback("Coke", "Coke"),
			Markup.button.callback("Pepsi", "Pepsi"),
		]),
	});
});

bot.command("random", ctx => {
	return ctx.reply(
		"random example",
		Markup.inlineKeyboard([
			Markup.button.callback("Coke", "Coke"),
			Markup.button.callback("Dr Pepper", "Dr Pepper", Math.random() > 0.5),
			Markup.button.callback("Pepsi", "Pepsi"),
		]),
	);
});

bot.command("caption", ctx => {
	return ctx.replyWithPhoto(
		{ url: "https://picsum.photos/200/300/?random" },
		{
			caption: "Caption",
			parse_mode: "Markdown",
			...Markup.inlineKeyboard([
				Markup.button.callback("Plain", "plain"),
				Markup.button.callback("Italic", "italic"),
			]),
		},
	);
});

bot.hears(/\/wrap (\d+)/, ctx => {
	return ctx.reply(
		"Keyboard wrap",
		Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
			columns: parseInt(ctx.match[1]),
		}),
	);
});

bot.action("Dr Pepper", (ctx, next) => {
	return ctx.reply("👍").then(() => next());
});

bot.action("plain", async ctx => {
	await ctx.answerCbQuery();
	await ctx.editMessageCaption(
		"Caption",
		Markup.inlineKeyboard([
			Markup.button.callback("Plain", "plain"),
			Markup.button.callback("Italic", "italic"),
		]),
	);
});

bot.action("italic", async ctx => {
	await ctx.answerCbQuery();
	await ctx.editMessageCaption("_Caption_", {
		parse_mode: "Markdown",
		...Markup.inlineKeyboard([
			Markup.button.callback("Plain", "plain"),
			Markup.button.callback("* Italic *", "italic"),
		]),
	});
});

bot.action(/.+/, ctx => {
	return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
});



if (process.env.NODE_ENV === 'production') {
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
      secretToken: "sdfsdfeeee444545dd",
    },
  })
      .then((res) => console.log(`Launched at ${new Date()}`))
      .catch((err) => console.log(`ERROR at launch:`, err))
} else {
  bot.launch()
      .then((res) => console.log(`Launched at ${new Date()}`))
      .catch((err) => console.log(`ERROR at launch:`, err))
}