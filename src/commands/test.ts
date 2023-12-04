import {
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';

import { CommandHelper } from "../interfaces/commandEmbed";

const comInfo: CommandHelper = {
    Name: 'test',
    Description: 'Replies with a Test',
    ReplyEmbed: new EmbedBuilder()
        .setTitle("The Test")
        .setDescription('The Test reply'),
}

export const data = new SlashCommandBuilder()
        .setName(comInfo.Name)
        .setDescription(comInfo.Description);

export async function execute(interaction: CommandInteraction) {
    const embed = comInfo.ReplyEmbed
        .setFooter({
        text: `Bot pinged by ${interaction.user.displayName}`,
        iconURL: interaction.user.avatarURL()?.toString(), 
    }); 

    const sent = await interaction.reply({embeds: [embed] });
}
