const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { DEFAULT_EMBED_COLOR, API_BASE_URL, CSIHU_LOGO_URL } = require("../resources/config.json");


// Handle the interaction
async function handle(interaction) {
    const embed = new MessageEmbed()
        .setColor(DEFAULT_EMBED_COLOR)
        .setTitle("CSIHU Courses")
        .setURL("https://courses.cs.ihu.gr/")
        .setDescription("Go to courses.")
        .setAuthor("CSIHU", CSIHU_LOGO_URL)
        .setThumbnail(`${API_BASE_URL}/images/courses_logo.png`)
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("courses")
        .setDescription("Go to courses."),

    async execute(interaction) {
        await handle(interaction);
    }
}