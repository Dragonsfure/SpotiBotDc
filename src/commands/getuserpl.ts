import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteractionOptionResolver,
  APIEmbedField,
} from "discord.js";

import { CommandHelper } from "../interfaces/commandEmbed";
import { Page, Playlist } from "@spotify/web-api-ts-sdk";
import { myapi } from "../models/myspotapi";

//Helper to initiate Helping Variables (used in my template)
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

  comInfo.ReplyEmbed.setFooter({
    text: `Bot pinged by ${interaction.user.displayName}`,
    iconURL: interaction.user.avatarURL()?.toString(),
  });

  await interaction.reply({
    content: "Fetching Playlists... Pls wait",
    embeds: [comInfo.ReplyEmbed],
  });

  //Checks if the Content is null 
  //Needs another check if its rly a user afterwards
  if (test !== null) {
    let endItems = {} as Page<Playlist>;
    let playlists = await myapi.playlists.getUsersPlaylists(test);
    endItems = playlists;

    const totalNumb = playlists.total;

    const defaultLimit = 20;
    let numbOfRequests = 0;

    //Fetches all Playlists
    while (true) {
      if (endItems.items.length >= totalNumb) {
        break;
      } else {
        numbOfRequests += 1;
      }
      playlists = await myapi.playlists.getUsersPlaylists(
        test,
        defaultLimit,
        numbOfRequests * defaultLimit
      );
      playlists.items.forEach((element) => {
        endItems.items.push(element);
      });
    }

    //Filters so only 10 Playlists get shown.
    let playsAfterSort: Playlist[];
    if (endItems.items.length > 10) {
      playsAfterSort = endItems.items.filter((y) => y.collaborative == false);
      playsAfterSort = playsAfterSort.sort((x) => x.tracks.total).slice(0, 10);

      comInfo.ReplyEmbed.setDescription(
        "There are More Playlists then shown, maybe checkout their Profile at \n" +  `https://open.spotify.com/user/${test}` 
      );
    } else {
      playsAfterSort = endItems.items;
    }

    //Iterates trough the array to create an Custom Field Array for the embed later.
    let items: APIEmbedField[] = [];
    let index: number= 0; 
    playsAfterSort.forEach((element) => {
      items.push({
        name: `[${index}]  ${element.name}`,
        value: `[${element.name}](${element.external_urls.spotify})`,
        inline: true,
      });
      index ++; 
    });

    //Sets the Fields of the Embed to the items.
    comInfo.ReplyEmbed.setFields(items);
  }

  await interaction.editReply({ content: "", embeds: [comInfo.ReplyEmbed] });
}
