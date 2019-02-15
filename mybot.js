const Discord = require("discord.js");
const YTDL = require("ytdl-core");
let cooldown = new Set();
const globalCD = 5;
//const Browser = require("zombie");

//const dispatcher = connection.playFile('C:/Users/Discord/Desktop/myfile.mp3');

const commands = ["ping", "same", "help","join","leave", "d?", "play","stop"];

const client = new Discord.Client();

var playing = false;

var servers = {};


client.on("ready", () => {
  console.log("I am ready!");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.content.startsWith('!') && !cooldown.has(message.author.id)) {
    cooldown.add(message.author.id);
    var msg = message.content;
    var args = message.content.substring(1).split(' ');
    var cmd = "";
    cmd = args[0].toLowerCase();

    if(cmd.startsWith('d') && isNumeric(cmd.substring(1))){
      numSides = parseInt(cmd.substring(1));
      console.error("Num sides = " + parseInt(numSides));
      var rollresults = diceRoll(numSides);
      message.reply("You rolled a d" + numSides + " and got a " + rollresults + "!");
    }
    else if(cmd.includes('d') && isNumeric(cmd.substring(1))){
      if(isNumeric(cmd.substring(0,1))){
        var dIndex = cmd.indexOf('d');
        var numberOfDice = parseInt(cmd.substring(0,dIndex));
        console.error("NUMBER OF DICE = " + numberOfDice);
        if (numberOfDice == undefined){
          numberOfDice = 1;
          console.error("..changed to one")
        }
        var numSides = parseInt(cmd.substring(dIndex + 1));
        diceRoll(numSides, numberOfDice);
      }
    }

    switch(cmd) {
            // !ping
            case 'ping':
              message.channel.send("pong!");
              break;

            case 'same':
              message.channel.send('http://i0.kym-cdn.com/entries/icons/original/000/024/527/Screen_Shot_2017-10-31_at_12.17.45_PM.png');
              break;

            case 'help':
              var mes = 'You can send me any of these commands\n';
              for (var i = 0; i < commands.length; i++) {
                mes = mes + commands[i];
                mes = mes + "\n";
              }
              message.channel.send(mes.substring(0));
              break;

            case 'kill':
              message.channel.send('Sorry, but I cant do that');
              break;

            case 'join':
                // Only try to join the sender's voice channel if they are in one themselves
                if(!message.member.voiceChannel){
                message.channel.send('Join a voice channel first, dummy');
                return;
              }
                  message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection

                })
                  .catch(console.log);
              break;

            case 'leave':
            playing = false;
              if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
              break;

            case 'okaythisisepic':
              message.channel.send('https://cdn.discordapp.com/attachments/521546183529857025/521551062491070465/1.gif https://cdn.discordapp.com/attachments/521546183529857025/521551066295304193/2.gif https://cdn.discordapp.com/attachments/521546183529857025/521551069004824576/3.gif https://cdn.discordapp.com/attachments/521546183529857025/521551072494616580/4.gif https://cdn.discordapp.com/attachments/521546183529857025/521551074830843904/5.gif');
              break;

            case "play":
              playing = true;
              if(!cmd[1])
              {
                message.channel.send('Please gib link');
                return;
              }

              if(!message.member.voiceChannel){
                message.channel.send('Join a voice channel first, dummy');
                return;
              }
              if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
              };

              var server = servers[message.guild.id];
              server.queue.push(cmd.substring(4, cmd.length));

              if(!message.guild.VoiceConnection) message.member.voiceChannel.join().then(function(connection) {


                var url = msg.substr(5);

                server.dispatcher = connection.playStream(YTDL(url, {filter: "audioonly"}));
              });
              break;

            case "stop":
              playing = false;
              var server = servers[message.guild.id];
              if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
              break;

            case "fuckyou":
              message.channel.send('fuck you jarrett');
              break;
            case "somethingsomethingsomething":
              return 0;

  }

}

else if(cooldown.has(message.author.id) && message.content.startsWith('!')){
  message.reply("Dude, you gotta wait before you keep sending me shit");
}

if (message.content.startsWith('oof')) {
  if(message.member.voiceChannel && playing == false)
  {
  message.member.voiceChannel.join()
    .then(connection => { // Connection is an instance of VoiceConnection
      const dispatcher = connection.playFile('D:/Users/neale/Documents/DiscordBot/oof.mp3');
    });
  }

}

setTimeout(() => cooldown.delete(message.author.id), globalCD*1000);

});

function isNumeric(num){
  return !isNaN(num)
}

function diceRoll(numSides){ 
  console.error("ROLL MULTIPLE");
  var roll = (Math.floor((Math.random())*numSides) + 1);
  console.error("Roll: " + roll);
  return roll;
}
function diceRoll(numSides, timesRolled){
  console.error("ROLL MULTIPLE (" + timesRolled + ")");
  var total = 0;
  var x;
  for(x = 0; x < timesRolled; x++){
    var roll = diceRoll(numSides);
    console.error("Roll total: " + roll);
    total += roll;
  }
  console.error("Roll total: " + total);
  return total;
}

client.login("NDM0MDM3OTcyNjc3OTUxNTI1.Ddiwaw.V344SdjhvAJfNCwpGjG79yCIqQg");
