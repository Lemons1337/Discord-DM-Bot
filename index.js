const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const Bot = require('./bot.js');
const fs = require('fs');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split('\n');

var i = 0;
setInterval(() => {
    if (i > tokens.length) return;
    new Bot(client, tokens[i]).send();
    i++;
}, config.login_delay);