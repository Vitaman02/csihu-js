const { SlashCommandBuilder } = require("@discordjs/builders");


async function handle(interaction) {
    // Check if member is connected to a voice channel
    const voice = interaction.member.voice;
    const voiceChannel = voice.channel;
    if (!interaction.member.voice.channelId) {
        await interaction.reply({ content: "You are not connected to a voice channel.", ephemeral: true });
        return;
    }

    // Get connected members
    const voiceMembers = voiceChannel.members;

    // Iterate over the members and create output text
    out = [];
    for (iterMember of voiceMembers) {
        const id = iterMember[0];
        const member = iterMember[1];
        if (member.id == interaction.member.id) {
            continue;
        }
        out.push(member);
    }

    // If there is no output then the member is alone in the voice channel
    if (out == []) {
        await interaction.reply({ content: "You are alone in the voice channel.", ephemeral: true });
        return;
    }

    // If there is output, remove the
    out = out.join(" - ");
    await interaction.reply(`${interaction.member} tagged: ${out}`);
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("tag")
        .setDescription("Tags everyone in your voice channel."),

    async execute(interaction) {
        await handle(interaction);
    }
}