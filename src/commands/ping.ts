import { CommandInteraction, SlashCommandBuilder, EmbedBuilder   } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder ();
    embed
    .setTitle('WELCOME')
    .setAuthor({name: "Test"})
    .setDescription('HELLO BOIIII')
    interaction.reply({embeds: [embed]})
 };
//   return interaction.reply("Pong!");
