const discord = require('discord.js')

const { prefix, secretCmds } = require('./config.json');
const { token } = require('./api_keys.json');

const client = new discord.Client();
const { getSubredditURL } = require('./reddit');

var snoowrap = require('snoowrap');
const { user, pass } = require('./api_keys.json');

const r = new snoowrap({
    userAgent: 'discbot',
    clientId: 'g1bbyKZRmGKF1K9Ck7HDkw',
    clientSecret: '38NkVIn8zsCpOLC81knSyN0cga8zCw',
    username: user,
    password: pass
  });

client.on('message', async message => {

    // Help Commands
    if (message.content.toLowerCase() === prefix + ' help'){
        fields = [
      {name: "Hot Page Reddit", value: "r [Subreddit_Name]"},
      {name: "Top Page Reddit", value: "rt [Subreddit_Name]"},
      {name: "Rising Page Reddit", value: "rr [Subreddit_Name]"},
      {name: "New Page Reddit", value: "rn [Subreddit_Name]"},
      {name: "Controversial Page Reddit", value: "rc [Subreddit_Name]"},
      {name: "Secret Commands", value: "r help secret"},
		  ]

      embed = new discord.MessageEmbed()
        .setTitle("R Commands")
        .addFields(fields)
      message.channel.send(embed)
    } else if (message.content.toLowerCase() === prefix + ' help secret'){
		  message.channel.send("There are " + secretCmds + " secret command/s")
    } else if (message.content.toLowerCase().startsWith(prefix + '')){
      var input = message.content.toLowerCase().substr(2).replace(/\s/g, '');
      var option = message.content.toLowerCase()[1]

      if (option == " "){
        option = "h"
      }

      switch(input){
        case "5050": 
          getSubredditURL("FiftyFifty", option).then((output) => {
            message.channel.send(output)
            return
          }).catch(console.log)
          break;
        case "ass": 
          getSubredditURL("asstastic", option).then((output) => {
            message.channel.send(output)
            return
          }).catch(console.log)
          break;
        default:
          getSubredditURL(input, option).then((output) => {
            message.channel.send(output)
            return
          }).catch(console.log)
      }
    }
})

client.login(token)
