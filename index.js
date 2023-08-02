
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./token.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Client ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);
