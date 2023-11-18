import { Client } from "discord.js";

export const myClient = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});
