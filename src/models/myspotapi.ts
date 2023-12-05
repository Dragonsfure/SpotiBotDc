import {Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk"
import { config } from "../config";

export const myapi = SpotifyApi.withClientCredentials(
    config.CLIENT_ID,
    config.CLIENT_SECRET,
    Scopes.playlistRead
);
