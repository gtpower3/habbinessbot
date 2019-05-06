///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//require stuff
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//discord.js
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();

//nootbot.json
const config = require('./habbinessbot.json');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//declarations
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//IDs
var gt = "<@!111782598199513088>";
var gtid = "111782598199513088";
var habbinessbot = "<@421280026621771776>";
var habbinessbot2 = "<@!421280026621771776>";
var habbinessbotid = "421280026621771776";
var nbcontrol = "195666499254353920";

//messages
var prefix = config.prefix;

function now()
{
  let time = new Date();

  let date = time.getDate(); //date
  if(date < 10)
  {
    date = "0" + date;
  }

  let month = time.getMonth()+1; //month
  if(month < 10)
  {
    month = "0" + month;
  }
  month.toString();

  let year = time.getFullYear(); //year
  let hours = time.getHours(); //hours
  let suffix = hours >= 12 ? "PM":"AM"; //if greater >= 12 then PM, else AM
  hours = (hours + 11) % 12 + 1; //converts hours to 12h format
  if(hours < 10)
  {
    hours = hours.toString();
    hours = "0" + hours;
  }
  hours = hours;
  hours = hours.toString();

  let minutes = time.getMinutes(); //minutes
  if(minutes < 10)
  {
    minutes = "0" + minutes;
  }
  minutes.toString();

  let seconds = time.getSeconds(); //seconds
  if(seconds < 10)
  {
    seconds = "0" + seconds;
  }
  seconds.toString();

  return `${hours}:${minutes}:${seconds} ${suffix} @ ${date}/${month}/${year}`;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function isVowel(str) {
  return str == "a" || str == "e" || str == "i" || str == "o" || str == "u";
}

function numToWord(num) {
  if(num === "0") return "zero";
  else if(num === "1") return "one";
  else if(num === "2") return "two";
  else if(num === "3") return "three";
  else if(num === "4") return "four";
  else if(num === "5") return "five";
  else if(num === "6") return "six";
  else if(num === "7") return "seven";
  else if(num === "8") return "eight";
  else if(num === "9") return "nine";
  else return num;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function handleCMD(msg)
{
  msg.channel.startTyping();
  var input = msg.content.toUpperCase();

}

bot.on("ready", () => {
  console.time("ready");
  console.log(`HABBINESS READY ${now()}`);
  console.timeEnd("ready");
});//ready

bot.on("disconnect", (err) => {
  console.error(`habbinessbot disconnected:\n${err.code} - ${err.reason}`);
});

bot.on("reconnecting", () => {
  console.error("habbinessbot is reconnecting...");
}); //reconnecting

bot.on("resume", num => {
  console.log("habbinessbot connected");
}); //resume

bot.on("message", msg => {
  if(msg.author.id == habbinessbotid) return;

  let input = msg.content.toUpperCase();

  if(msg.content.startsWith(prefix)) handleCMD(msg);
});

process.on("unhandledRejection", err => {
  if(!err) return console.error("Unknown promise error");
  console.error("Uncaught Promise Error: \n" + err.stack);
});

bot.login(process.env.HABBINESS_BOT_TOKEN);
