const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: false});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Being worked on", {type: "playing"});
  bot.user.setStatus("dnd");
});


exports.run = (client, message, args, level) => {



  if(message.author.id !== config.ownerID) return;
  if(message.content.startsWith(config.prefix + "prefix")) {
      // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      // change the configuration in memory
      config.prefix = newPrefix;
      message.channel.send(`Prefix has been updated to ${newPrefix}`).catch(console.error);
}


  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('**Invalid Format:** `!Poll <Question>`')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#5599ff")
  .setDescription(`${question}`)
  .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)

  message.channel.send({embed})
  .then(msg => {
    msg.react('👍')
    msg.react('👎')
    msg.react('🤷')
  })
  .catch(() => console.error('Emoji failed to react.'));





}
bot.login(botconfig.token);
