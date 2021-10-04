const { SlashCommandBuilder } = require("@discordjs/builders");


// Handle the interaction
async function handle(interaction) {
    return interaction.reply("Pong!");
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),

    async execute(interaction) {
        await handle(interaction);
    }
}