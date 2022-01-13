const fetch = require('node-fetch');
const Discord = require('discord.js');

function checkRank(id){

  var file = './ranking/flippyRankingsFinalForBot.csv';  
  var fs = require('fs');
  var rank;
  var data = fs.readFileSync(file)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array


  rank = (id == 5000) ? 1 : parseInt(data[id][1]);
  return new Promise((resolve) => resolve (rank));
}

module.exports = {
	name: "rank",
	execute(message, args) {

          if (!args.length) {
            return message.channel.send(`You didn't provide a token id, ${message.author}!`);
          }
          if (isNaN(parseInt(args[0]))) {
            return message.channel.send(`Token id must be a number!`);
          }
          if ((parseInt(args[0]) > 5000 || parseInt(args[0]) < 0 || parseInt(args[0]) == 4999)) {
            return message.channel.send(`Flippy with that token id doesn't exist!`);
          }

    checkRank(args[0])
      .then((rank) => {
        message.channel.send(`The rank of your flippy is ${rank}`);
      })
      .catch(error => message.channel.send(error.message));
	},
};