import Eris, { CommandOptions } from "eris";
import { global } from "../main/global"
import commands from "../commands"

console.log("Loading...");
console.log(
    `Configuration:
       experimental: ${global.experimental}
       name: ${global.name}
       prefix: ${global.prefix}`
    )

const bot = new Eris.CommandClient(global.token, {
    allowedMentions: {everyone: false}, //No pingy everyone
    maxShards: "auto",
}, { //Make commandclient
    description: "A very funny man lmao",
    owner: "Kopy",
    prefix: global.prefix,
    name: global.name,
    ignoreBots: false,
    ignoreSelf: false
});

global.bot = bot;

bot.on("ready", () => { console.log("Ready!") }); //When bot is ready, log ready
bot.on("error", (err) => {console.error(err)}); //If the bot encounters an error, log it
bot.on("shardReady", (id) => {bot.shards.get(id).editStatus("online", {name: `Do ${global.prefix}help for help | Version ${global.version} | Shard ${id}`, type: 3})})

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