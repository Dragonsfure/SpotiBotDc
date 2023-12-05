import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_TESTGUILD_ID,
  CLIENT_ID,
  REDIRECT_URI,
  CLIENT_SECRET,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !DISCORD_CLIENT_ID ||
  !DISCORD_TESTGUILD_ID ||
  !DISCORD_TESTGUILD_ID ||
  !CLIENT_ID ||
  !REDIRECT_URI ||
  !CLIENT_SECRET
) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_TESTGUILD_ID,
  CLIENT_ID,
  REDIRECT_URI,
  CLIENT_SECRET,
};
