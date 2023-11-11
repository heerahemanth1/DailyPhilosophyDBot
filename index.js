
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./token.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Client ready! Logged in as ${c.user.tag}`);
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const targetEvent = require(filePath);
    if (targetEvent.once) {
        client.once(targetEvent.name, (...args) => targetEvent.execute(...args));
    } else {
        client.on(targetEvent.name, (...args) => targetEvent.execute(...args))
    }
}

client.login(TOKEN);
