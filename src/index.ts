import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { myClient } from "./models/myclient";

myClient.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

myClient.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

myClient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

myClient.login(config.DISCORD_TOKEN);