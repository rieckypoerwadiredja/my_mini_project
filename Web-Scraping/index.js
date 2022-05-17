const bot = require('./bot');

(async () => {
    await bot.init();
    await bot.start();
    await bot.close();
    await bot.end()
})()