const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token } = require("./resources/config.json");
const fs = require("fs");

// Create commands list and place clientID
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const clientID = "892405501877448725";

// Push all command data to command list
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Get REST
const rest = new REST({ version: '9' }).setToken(token);

// Update commands
rest.put(Routes.applicationCommands(clientID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
