const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { RULES } = require("../resources/rules.json");
const { DEFAULT_EMBED_COLOR, CSIHU_LOGO_URL } = require("../resources/config.json");


// Handle the interaction
async function handle(interaction) {
    const member = interaction.member
    const embed = new MessageEmbed()
        .setColor(DEFAULT_EMBED_COLOR)
        .setTitle("CSIHU Rules")
        .setAuthor("CSIHU", CSIHU_LOGO_URL)
        .setFooter(member.user.username, member.user.avatarURL())
        .setTimestamp();

    // If a rule number is specified then only send that rule
    const ruleNumber = interaction.options.get("rule").value;
    if (ruleNumber) {
        // Check if the rule number is outside of the range
        if (ruleNumber > RULES.length || ruleNumber <= 0) {
            await interaction.reply({ content: `There is no rule **#${ruleNumber}**`, ephemeral: true });
            return;
        }

        // If it is inside the range of rules
        // add a field with the rule's text
        embed.addField(`Rule #${ruleNumber}`, RULES[ruleNumber - 1], false);
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    }

    // If no rule number is specified then send all the rules
    for (const [index, rule] of RULES.entries()) {
        embed.addField(`Rule #${index + 1}`, rule, false);
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
        .setDescription("View the server's rules")
        .addNumberOption(option =>
            option.setName("rule")
                .setDescription("The rule's index number")
                .setRequired(false)),

    async execute(interaction) {
        await handle(interaction);
    }
}