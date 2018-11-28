const config = require('./config.json');

const chalk = require('chalk');
const request = require('request');

class Bot {
    constructor(client, token, invite, message) {
        this.client = client;
        this.token = token;
        this.invite = invite;
        this.message = message;
    }
    send() {
        this.client.on('ready', () => {
            var g = 0;
            request({
                method: "POST",
                url: `https://discordapp.com/api/v7/invite/${this.invite}`,
                json: false,
                headers: {
                    authorization: this.token
                },
            }, (error, response, body) => {
                if (!body) return;
                var json = JSON.parse(body);
                if (!json || !json.guild || !json.guild.id) return;
                var guild = json.guild.id;
                try {
                    this.client.guilds.get(guild).members.map(member => {
                        if (member.id === this.client.user.id) {
                            console.log(chalk.yellow(`Warning | You can't DM yourself silly!`));
                        } else {
                            setTimeout(() => {
                                this.client.users.get(member.id).send(this.message).then(g => {
                                    console.log(chalk.green(`Success | Sent DM to ${member.user.tag}!`));
                                }).catch(err => {
                                    console.log(chalk.yellow(`Warning | User ${member.user.tag} has Direct Messages Disabled!`));
                                });
                            }, config.delay * g++);
                        }
                    });
                } catch(err) {
                    console.log(err);
                }
            });
        });
        this.client.login(this.token).catch(err => {
            console.log(chalk.red(`Error: Invalid Token | ${this.token}`));
        });
    }
}

module.exports = Bot;
