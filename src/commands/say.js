const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMOJI_CHARACTERS } = require("../resources/emoji_characters.json")


// Handle the interaction
async function handle(interaction) {
    const text = String(interaction.options.getString("text")).toLowerCase();
    let out = "";
    const chars = [];
    for (const char of text) {
        if (char in EMOJI_CHARACTERS) {
            chars.push(EMOJI_CHARACTERS[char]);
        } else {
            chars.push("  ");
        }
    }
    out = `${interaction.member} said: ${chars.join(" ")}`;
    await interaction.reply({ content: out });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Say something in emojis.")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("The text to display in emojis")
                .setRequired(true)),

    async execute(interaction) {
        await handle(interaction);
    }
}