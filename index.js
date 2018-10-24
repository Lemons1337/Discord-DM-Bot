const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const Bot = require('./bot.js');
const chalk = require('chalk');
const fs = require('fs');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split('\n');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var i = 0;
rl.question(chalk.blue('Invite Code: '), (invite) => {
    rl.question(chalk.blue('Message to Send: '), (message) => {
        setInterval(() => {
            if (i >= tokens.length) return;
            new Bot(client, tokens[i], invite, message).send();
            i++;
        }, config.login_delay);
    });
});
