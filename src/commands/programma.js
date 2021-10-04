const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { DEFAULT_EMBED_COLOR, CSIHU_LOGO_URL } = require("../resources/config.json");

// Handle the interaction
async function handle(interaction) {
    const embed = new MessageEmbed()
        .setColor(DEFAULT_EMBED_COLOR)
        .setTitle("CSIHU Schedule")
        .setURL("https://cs.ihu.gr/cs_hosting/attachments/webpages/el_timetable.pdf")
        .setDescription("View the schedule.")
        .setAuthor("CSIHU", CSIHU_LOGO_URL)
        .setThumbnail(CSIHU_LOGO_URL)
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("programma")
        .setDescription("View the schedule"),

    async execute(interaction) {
        await handle(interaction);
    }
}