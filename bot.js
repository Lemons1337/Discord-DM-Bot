const config = require('./config.json');

const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Bot {
    constructor(client, token) {
        this.client = client;
        this.token = token;
    }
    send() {
        this.client.on('ready', () => {
            rl.question(chalk.blue('Guild ID to Mass DM: '), (guild) => {
                rl.question(chalk.blue('Message to Send: '), (message) => {
                    var g = 0;
                    try {
                        this.client.guilds.get(guild).members.map(member => {
                            if (member.id === this.client.user.id) {
                                console.log(chalk.yellow(`Warning | You can't DM yourself silly!`));
                            } else {
                                setTimeout(() => {
                                    member.send(message).then(g => {
                                        console.log(chalk.green(`Success | Sent DM to ${member.user.tag}!`));
                                    }).catch(err => {
                                        console.log(chalk.yellow(`Warning | User ${member.user.tag} has Direct Messages Disabled!`));
                                    });
                                }, config.delay * g++);
                            }
                        });
                    } catch(err) {
                        console.log(err);
                        console.log('Invalid Guild ID!');
                    }
                });
            });
        });
        try {
            this.client.login(this.token);
        } catch(err) {
            console.log(chalk.red(`Error: Invalid Token | ${this.token}`));
        }
    }
}

module.exports = Bot;