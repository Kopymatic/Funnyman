/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-namespace */
import BaseBot from "@kopymatic/basebot";
import { CommandClient } from "eris";
import { Sequelize } from "sequelize/types";
import config from "../resources/config.json";

module global {
    export const experimental = config.experimental;
    export const version = config.version;
    export let name: string;
    export let prefix: string;
    export let token: string;
    export const defaultColor = 0xff6fff; //I would load these from config.json but then id have to parse and ehhhhhh
    export const red = 0xed4245;
    export const green = 0x57f287;
    if (experimental) {
        //There is probably a much better way to do this
        name = config.devBot.name;
        prefix = config.devBot.prefix;
        token = config.devBot.token;
    } else {
        name = config.mainBot.name;
        prefix = config.mainBot.prefix;
        token = config.mainBot.token;
    }
    export let client: CommandClient;
    export let bot: BaseBot;
    export const databaseUsername: string = config.database.user;
    export const databasePassword: string = config.database.password;
    export let database: Sequelize;
    export const loggingChannelId: string = config.loggingChannelId;
    export const devServerId = config.devServerId;
    export let absoluteStartTime: number;
}
export default global;
