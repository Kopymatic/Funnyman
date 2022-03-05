import { randomInt } from "crypto";
import { Message, TextableChannel } from "eris";
import KopyCommand from "../../utilities/KopyCommand";
import lists from "../../resources/lists.json";
import global from "../../main/global";

export class InsultSimulator extends KopyCommand {
    constructor() {
        super();
        this.label = "Insult";
        this.options = {
            description: "Insult whoever or whatever",
            fullDescription: "Insult whoever or whatever",
            aliases: ["InsultSimulator"],
            usage: "[Thing to insult]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with something to Insult",
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        const name = args[0];
        const insult = lists.Insults[randomInt(lists.Insults.length)];
        const final = insult.replace(/~/g, name);
        global.bot.createMessage(msg.channel.id, final);
        return null; //Return null so it doesnt send anything else
    }
}
