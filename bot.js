const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;

var bot = new Discord.Client();

// Put the Music module in the new Client object.
// This allows for easy access to all the modules
// functions and data.
bot.music = require("discord.js-musicbot-addon");

// Now we start the music module.
bot.music.start(bot, {
    // Set the api key used for YouTube.
    // This is required to run the bot.
    youtubeKey: process.env.BOT_YOUTUBE_TOKEN,
    botPrefix: PREFIX
});

// Events.
bot.on("ready", function() {
    bot.user.setGame(`Listening To YouTube `, `https://www.twitch.tv/monstercat`);
    console.log(`${bot.user.username} is Ready!`);
});

//////////////////////////////***EVENT COLLECTION FUNCTION***////////////////////////////////////////////////
//Allows the bot to log and show events (Joining New Servers)
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
 
client.commands = new Enmap();
client.aliases = new Enmap();
 
//Stops the bot from responding to other bots.
client.on('message', message => {
  if(message.author.bot) return;
})
 
//////////////////////////////***DEFINE COMMANDS FUNCTION***////////////////////////////////////////////////
//This code line allows the commands to be individual/seperate files
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
