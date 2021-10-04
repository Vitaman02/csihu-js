const { SlashCommandBuilder } = require("@discordjs/builders");


// Handle the interaction
async function handle(interaction) {
    const member = interaction.options.get("member").member;
    const roles = member.roles;
    console.log(roles);
    await interaction.reply({ content: `${member}` });
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