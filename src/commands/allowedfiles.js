const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { DEFAULT_EMBED_COLOR, CSIHU_LOGO_URL } = require("../resources/config.json");
const { ALLOWED_FILES } = require("../resources/allowedfiles.json");


// Handle the interaction
async function handle(interaction) {
    let file_extensions = ALLOWED_FILES.join(" - ");
    const embed = new MessageEmbed()
        .setColor(DEFAULT_EMBED_COLOR)
        .setTitle("Allowed files")
        .setDescription("These are all the allowed file extensions.")
        .setAuthor("CSIHU", CSIHU_LOGO_URL)
        .addField("File Extensions", file_extensions)
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("allowedfiles")
        .setDescription("View all the allowed file extensions."),

    async execute(interaction) {
        await handle(interaction);
    }
}