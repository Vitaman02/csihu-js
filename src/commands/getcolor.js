const { SlashCommandBuilder } = require("@discordjs/builders");


// Handle the interaction
async function handle(interaction) {
    // Get mention member's color
    const member = interaction.options.get("member").member;
    const color = member.displayHexColor;
    await interaction.reply(`${member}'s color in hex is: ${color}`);
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("get-color")
        .setDescription("Get a member's color role")
        .addUserOption(option =>
            option.setName("member")
                .setDescription("The member to get the color from.")
                .setRequired(true)),

    async execute(interaction) {
        await handle(interaction);
    }
}