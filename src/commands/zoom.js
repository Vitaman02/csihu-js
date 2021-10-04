const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { DEFAULT_EMBED_COLOR, API_BASE_URL, CSIHU_LOGO_URL } = require("../resources/config.json");
const { ZOOM_MEETING_URL } = require("../resources/zoom.json");


// Handle the interaction
async function handle(interaction) {
    const embed = new MessageEmbed()
        .setColor(DEFAULT_EMBED_COLOR)
        .setTitle("CSIHU Zoom")
        .setURL(ZOOM_MEETING_URL)
        .setDescription("Join Zoom meeting class.")
        .setAuthor("CSIHU", CSIHU_LOGO_URL)
        .setThumbnail(`${API_BASE_URL}/images/zoom_logo.png`)
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("zoom")
        .setDescription("Join Zoom meeting class."),

    async execute(interaction) {
        await handle(interaction);
    }
}