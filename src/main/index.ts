import Eris, { CommandOptions } from "eris";
import { global } from "../main/global"
import commands from "../commands"
import { Sequelize } from "sequelize";

console.log("Loading...");
console.log(
    `Configuration:
       experimental: ${global.experimental}
       name: ${global.name}
       prefix: ${global.prefix}`
    );

global.database = new Sequelize(`postgres://${global.databaseUsername}:${global.databasePassword}@localhost:5432/KotBot`, {logging: false});
try {
    global.database.authenticate();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const bot = new Eris.CommandClient(global.token, {
    allowedMentions: {everyone: false}, //No pingy everyone
    maxShards: "auto",
}, {
    description: "A very funny man lmao",
    owner: "Kopy",
    prefix: global.prefix,
    name: global.name,
});

global.bot = bot;

bot.on("ready", () => { //When bot is ready, log ready
    console.log("Ready!") 
    bot.createMessage("826674337591197708", {embed:{
        title: `${global.name} Version ${global.version} is now online!`,
        color: global.green
    }});
});
bot.on("shardReady", (id) => {bot.shards.get(id).editStatus("online", {name: `Do ${global.prefix}help for help | Version ${global.version} | Shard ${id}`, type: 3})})

bot.on("error", (err) => {  //If the bot encounters an error, log it
    console.error(err)
    bot.createMessage("826674337591197708", {embed:{
        title: `${global.name} encountered an error!`,
        description: `\`\`\`${err.name}\n${err.message}\n${err.stack}\`\`\``,
        color: global.red
    }});
});

commands.forEach(command => {
    console.debug(`Loading command "${command.label}"`);
    let registered = bot.registerCommand(command.label, command.generator, command.options);
    if(command.subcommands.length > 0) {
        command.subcommands.forEach(subCommand => {
            console.debug(`     Loading subcommand "${subCommand.label}"`);
            registered.registerSubcommand(subCommand.label, subCommand.generator, subCommand.options);
        })
    }
});

bot.editStatus("idle", {name: `Loading...`, type: 3})

bot.connect();