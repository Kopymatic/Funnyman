import Eris, { CommandOptions } from "eris";
import { global } from "../main/global"
import commands from "../commands"

console.log("Loading...");

if(global.experimental) {
    global.prefix = "dd"
    global.name = "FunnymanDev"
} else {
    global.prefix = "pp"
    global.name = "Funnyman"
}

const bot = new Eris.CommandClient("NzkzMjk2MTc5NTU5MDA2MjE4.X-qMow.yApK7BCpXprQzj5o7bU0y5cIuSk", {}, { //Make commandclient
    description: "A very funny man lmao",
    owner: "Kopy",
    prefix: "dd",
    name: "Funnyman"
});

global.bot = bot;

bot.on("ready", () => { console.log("Ready!") }); //When bot is ready, log ready
bot.on("error", (err) => {console.error(err)}); //If the bot encounters an error, log it

const echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    const text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if(args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    let text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

commands.forEach(command => {
    console.debug(`Loading command "${command.label}"`)
    let registered = bot.registerCommand(command.label, command.generator, command.options)
    if(command.subcommands.length > 0) {
        command.subcommands.forEach(subCommand => {
            registered.registerSubcommand(subCommand.label, subCommand.generator, subCommand.options)
        })
    }
});

bot.connect();