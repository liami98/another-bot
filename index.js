const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const superagent = require("superagent");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("-FlyPistol", {type: "playing"});
  bot.user.setStatus("online");
});

bot.on("message", async message => {
  if(message.author.bot) return; //Abort if this bot authored this message
  if(message.channel.type === "dm") return; //Abort if this was a DM

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = (messageArray[0]).toLowerCase();
  let args = messageArray.slice(1);




if (cmd === `${prefix}roll`) {
let numbers = (Math.floor(Math.random() * 100));

let rollembed = new Discord.RichEmbed()
  .addField("Number", numbers)
  .setColor("F30505")
  .setTimestamp();

  message.channel.send(rollembed);
}



if (cmd === `${prefix}help`){

let helpembed = new Discord.RichEmbed()
  .addField("Bots Commands!", "NO COMMANDS PLEASE DM liami98#6525 TO ADD COMMANDS!")
  .setColor("F30505")
  .setTimestamp();

  message.author.send(helpembed);
  message.reply("**Please check your DMS for all of the bots commands!**")
}

if (cmd === `${prefix}clear`){

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
if(!args[0]) return message.channel.send("Please say how many messages you would like to remove from 1-100.");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

if (cmd === `${prefix}dog`){
  let {body} = await superagent
.get(`https://random.dog/woof.json`)

let dogembed = new Discord.RichEmbed()
.setColor("#f44242")
.setTitle("Doggo")
.setImage(body.url);

message.channel.send(dogembed);

}

if (cmd === `${prefix}say`){

  if(!message.member.hasPermission("SEND_MESSAGES")) return message.reply("You can't do that!")
let botmessage = args.join(" ");
message.delete().catch();
message.channel.send(botmessage);
}



});

bot.login(botconfig.token);
