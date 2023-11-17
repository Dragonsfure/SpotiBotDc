import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { myClient } from "../models/myclient";
import CommandHelper from "../interfaces/commandEmbed";

const comInfo: CommandHelper = {
  Name: "ping", 
  Description: "Replies with Pong!",
  ReplyEmbed: new EmbedBuilder()
  .setTitle("Pong")
  .setDescription("Pinging..."),  
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

  embed.setDescription(`Roundtrip latency:  ${myClient.ws.ping}`)
 
  interaction.editReply({embeds: [embed] });
}