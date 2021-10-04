// Get Client, Intents and bot token
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./resources/config.json");

// Create client instance
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES
] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Log ready message on bot ready
client.once("ready", () => {
    console.log(
        `Bot ${client.user.username}#${client.user.discriminator} is ready!`
    );
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});


// Run bot
client.login(token);
