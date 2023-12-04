import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";

import { CommandHelper } from "../interfaces/commandEmbed";

const comInfo: CommandHelper = {
  Name: "getuserpr",
  Description: "Replies with the Spotify Profile",
  ReplyEmbed: new EmbedBuilder().setTitle("Spotify User-Info"),
};

export const data = new SlashCommandBuilder()
  .setName(comInfo.Name)
  .setDescription(comInfo.Description)
  .addStringOption((option) =>
    option
      .setName("infolink")
      .setDescription("The Profile-Link, an Playlist Link or the User-Id")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const info = interaction.options as CommandInteractionOptionResolver;
  const test = info.getString("infolink");

  console.log(info);
  console.log(test);

  // const embed = comInfo.ReplyEmbed.setFooter({
  //   text: `Bot pinged by ${interaction.user.displayName}`,
  //   iconURL: interaction.user.avatarURL()?.toString(),
  // });

  await interaction.reply("this the reply");
}
