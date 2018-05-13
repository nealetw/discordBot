const Discord = require("discord.js");
const YTDL = require("ytdl-core");

//const dispatcher = connection.playFile('C:/Users/Discord/Desktop/myfile.mp3');

const commands = ["ping", "same", "help","join","leave", "d6", "d20", "play","stop"];

const client = new Discord.Client();

var playing = false;

var servers = {};


client.on("ready", () => {
  console.log("I am ready!");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.content.startsWith('!')) {
    var msg = message.content;
    var args = message.content.substring(1).split(' ');
    var cmd = args[0].toLowerCase();

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
                message.channel.sendMessage('Join a voice channel first, dummy');
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
            case 'd6':
              var roll = Math.floor(Math.random() * 6+1);
              message.reply('You rolled a ' + roll);
              break;
            case 'd20':
              var roll = Math.floor(Math.random() * 20+1);
              if(roll == 20)
                message.reply('Oh shit! You rolled a ' + roll);
              else if(roll == 1)
                message.reply('Wow. You suck. You rolled a ' + roll);
              else
                message.reply('You rolled a ' + roll);
              break;
            case "play":
              playing = true;
              if(!cmd[1])
              {
                message.channel.sendMessage('Please gib link');
                return;
              }

              if(!message.member.voiceChannel){
                message.channel.sendMessage('Join a voice channel first, dummy');
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
            case "owo":
              message.guild.kick(message.author, { days: 1, reason: 'Because fuck him' });
              message.reply('Fuck you');
              break;

  }

}
if (message.content.startsWith('oof')) {
  if(message.member.voiceChannel && playing == false)
  {
  message.member.voiceChannel.join()
    .then(connection => { // Connection is an instance of VoiceConnection
      const dispatcher = connection.playFile('C:/Users/neale/Documents/DiscordBot/oof.mp3');
    });

  }

}



});

client.login("");
