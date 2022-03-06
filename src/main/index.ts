import Eris from "eris";
import global from "../main/global";
import { slashCommands, kopyCommands } from "../commands";
import { Sequelize } from "sequelize";
import * as pg from "pg";
import BaseBot from "@kopymatic/basebot";

global.database = new Sequelize(
    `postgres://${global.databaseUsername}:${global.databasePassword}@localhost:5432/KotBot`,
    {
        logging: false,
        dialectModule: pg,
    }
);
global.database.authenticate();
console.log("Database connection successful!");

const client = new Eris.CommandClient(
    global.token,
    {
        intents: [
            "guildMessages",
            "directMessages",
            "guildMessageReactions",
            "directMessageTyping",
            "guildMessageTyping",
            "guildEmojis",
        ],
        allowedMentions: { everyone: false }, //No pingy everyone
        maxShards: "auto",
        restMode: true,
    },
    {
        description: "A very funny man lmao",
        owner: "Kopy",
        prefix: global.prefix,
        name: global.name,
    }
);

global.client = client;
kopyCommands.forEach((command) => {
    console.debug(`Loading command "${command.label}"`);
    const registered = client.registerCommand(command.label, command.generator, command.options);
    if (command.subcommands.length > 0) {
        command.subcommands.forEach((subCommand) => {
            console.debug(`     Loading subcommand "${subCommand.label}"`);
            registered.registerSubcommand(
                subCommand.label,
                subCommand.generator,
                subCommand.options
            );
        });
    }
});

global.bot = new BaseBot(client, global.database, slashCommands, {
    devServerId: global.devServerId,
    experimental: global.experimental,
    loggingChannelId: global.loggingChannelId,
    name: global.name,
    version: global.version,
    defaultColor: global.defaultColor,
    statsCommand: true,
});
