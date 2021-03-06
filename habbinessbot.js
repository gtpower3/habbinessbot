///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//require stuff
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

require('dotenv').config();

//discord.js
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();

//habbinessbot.json
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

function dayToDate(day){
  if(day == 0) return "Sunday";
  else if(day == 1) return "Monday";
  else if(day == 2) return "Tuesday";
  else if(day == 3) return "Wednesday";
  else if(day == 4) return "Thursday";
  else if(day == 5) return "Friday";
  else if(day == 6) return "Saturday";
  else return "N/A";
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

function printTable(TTArray, channel){
  var res = "+ A B C\n";
  for (var i = 0; i < 3; i++) {
    res = res + i + " ";
    for (var j = 0; j < 3; j++) {
        res = res + TTArray[i][j] + " ";
    }
    res = res + "\n";
  }
  channel.send(`\`\`\`${res}\`\`\``);
}

function playTTT(channel){
  var TTArray = new Array(3);
  var isRunning = false;

  //declare and initialise tic tac toe table
  for (var i = 0; i < TTArray.length; i++)
    TTArray[i] = [];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        TTArray[i][j] = '-';
    }
  }
  printTable(TTArray, channel);

  while(isRunning){

  }
}

function colorize(member){
  var role = member.roles.find(role => role.name == member.id);

  if(role == null) {
    member.guild.createRole({
      name: member.id,
      color: 'RANDOM',
    })
    .then(role => {
      console.log(`Created new role with name ${role.name} and color ${role.color}`);

      //set created role to a member
      member.addRole(role);
    })
    .catch(console.error);
  }
  else{
    // Set the color of a role
    role.setColor('RANDOM')
    .then(role => console.log(`Set color of ${role.name} to ${role.color}`))
    .catch(console.error);
  }
}

function handleCMD(msg)
{

  var cmdInput = msg.content.split('_')[1].split(' ')[0].toUpperCase();
  console.log(cmdInput);

  if(cmdInput == "PING"){
    msg.reply("pong!");
  } else //PING

  if(cmdInput == "EVAL")
  {
    if(msg.author.id !== gtid) return;
    let code = msg.content.slice(5);
    try
    {
      eval(code);
    }
    catch (e)
    {
      msg.channel.send("```" + e + "```");
    }
  } else //eval

  if(cmdInput == "COLORIZE")
  {
    msg.delete();
    console.log("colorize initialising...");
    colorize(msg.member);
  }

  if(cmdInput == "COLORIZEALL")
  {
    msg.delete();
    console.log("colorize all initialising...");

    //check if owner is calling this cmd
    if(msg.author.id !== gtid) return;

    //fetch all roles in guild
    var guildroles = msg.guild.roles;
    console.log(`guildroles fetched of size: ${guildroles.size}`);

    //fetch guild members
    var guildmembers = msg.guild.members.filter(member => member.user.bot == false);
    console.log(`guildmembers fetched of size: ${guildmembers.size}`);

    for(let value of guildmembers.values())
    {
      if(value.roles.some(role => role.name == value.id)){ //if member already has colored role
        var roleToEdit = value.roles.find(role => role.name == value.id);
        // Set the color of a role
        roleToEdit.setColor('RANDOM')
        .then(role => console.log(`Set color of ${role.name} to ${role.color}`))
        .catch(console.error);
      }
      else {
        //create a role for each member with a random color
        msg.guild.createRole({
          name: value.id,
          color: 'RANDOM',
        })
        .then(role => {
          console.log(`Created new role with name ${role.name} and color ${role.color}`);

          //set created role to a member
          value.addRole(role);
        })
        .catch(console.error);
      }
    }

  } else //colorizeall

  if(cmdInput == "TIC"){
    console.log("entered tic");
    var players = [];
    players.push(msg.author.id);

    msg.channel.send(`who wants to play with ${msg.author}? (say "me")`);

/*
    const filter = m => m.content.toUpperCase() == "ME";
    const collector = msg.channel.createMessageCollector(filter, { time: 60 * 1000 });
    collector.on('collect', m => console.log(`Collected ${m.content}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
*/

    const collector = msg.channel.createMessageCollector(
     m => (m.content.toUpperCase() == "ME"),
     { time: 60*1000 });

    collector.on('collect', m => {
      if(m.content == "-1" && m.author.id === gtid) return collector.stop();
      if(players.includes(m.author.id)) return m.reply("ur already a player u idiot");
      else{
        m.reply(`${m.member.displayName} is in!`);
        collector.stop();
      }
    });

    collector.on('end', () => {
      msg.channel.send("starting game...");
      playTTT(msg.channel);
    });
  }


}

bot.on("ready", () => {
  console.time("ready");
  console.log(`HABBINESS READY ${now()}`);

  // Set the client user's presence
  bot.user.setPresence({ game: { name: '_colorize to change ur color' }, status: 'dnd' })
  .catch(console.error);
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

  if(msg.content.startsWith(prefix))
  {
    msg.channel.startTyping();
    handleCMD(msg);
    msg.channel.stopTyping(true);
  }
});

bot.on("guildMemberAdd", member => {
  colorize(member);
}); //resume

process.on("unhandledRejection", err => {
  if(!err) return console.error("Unknown promise error");
  console.error("Uncaught Promise Error: \n" + err.stack);
});

bot.login(process.env.HABBINESS_BOT_TOKEN);
