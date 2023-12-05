import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";

import { CommandHelper } from "../interfaces/commandEmbed";
import { Page, Playlist } from "@spotify/web-api-ts-sdk";
import { myapi } from "../models/myspotapi";

const comInfo: CommandHelper = {
  Name: "getuserpl",
  Description: "Replies with the public Playlists of an Spotify User",
  ReplyEmbed: new EmbedBuilder().setTitle("Spotify User-Playlists"),
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
  let  reply: string = "";

  if (test !== null) {
    let endItems = {} as Page<Playlist>;
    let playlists = await myapi.playlists.getUsersPlaylists(test);
    endItems = playlists;

    const totalNumb = playlists.total;
    const defaultLimit = 20;
    const numbOfRequests = Math.trunc(totalNumb / defaultLimit);

    await myapi.playlists.getUsersPlaylists(
      test,
      defaultLimit,
      numbOfRequests * defaultLimit
    );
    console.log(info);
    console.log(test);

    playlists.items.forEach((element) => {
      endItems.items.push(element);
    });

    console.table(
      endItems.items.map((item) => ({
        name: item.name,
        OwnerName: item.owner.display_name,
        Url: item.external_urls.spotify,
      }))
    );
    endItems.items.forEach((element) => {
      reply += `${element.name}\r\n`;
    });
  }

  // const embed = comInfo.ReplyEmbed.setFooter({
  //   text: `Bot pinged by ${interaction.user.displayName}`,
  //   iconURL: interaction.user.avatarURL()?.toString(),
  // });
  await interaction.reply(reply);
}
