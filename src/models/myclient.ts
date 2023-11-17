import { Client } from "discord.js";

const myClient = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

export {
    myClient 
}
    