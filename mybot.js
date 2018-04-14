const Discord = require("discord.js");
const client = new Discord.Client();

const commands = ["help", "same", "ping"];

client.on("ready", () => {
  console.log("I am ready!");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  message.content
  if (message.content.startsWith('!')) {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
            // !ping
            case 'ping':
              message.channel.send("pong!");
              break;
            case 'same':
              message.channel.send('http://i0.kym-cdn.com/entries/icons/original/000/024/527/Screen_Shot_2017-10-31_at_12.17.45_PM.png');
              break;
            case 'help':
              message.channel.send('You can send me any of these commands');
              var mes;
              for (var i = 0; i < commands.length; i++) {
                mes = mes + commands[i];
                mes = mes + "\n";
              }
              message.channel.send(mes.substring(9));
              break;
            case 'kill':
              message.channel.send('Sorry, but i cant do that');
              break;
  }
}});

client.login("");
