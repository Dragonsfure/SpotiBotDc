import {
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';

import myBotClient from '../models/myclient';
import CommandHelper from '../interfaces/commandEmbed';

const comInfo: CommandHelper = {
    Name: 'COMMANDNAME',
    Description: 'DECRIPTION',
    ReplyEmbed: new EmbedBuilder()
        .setTitle('COMMAND REPLY')
        .setDescription('CONTENT'),
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
