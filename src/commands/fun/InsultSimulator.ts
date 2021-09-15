import { randomInt } from "crypto";
import Eris, { GeneratorFunctionReturn, Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import lists from "../../resources/lists.json";
import { global } from "../../main/global";

export class InsultSimulator extends KopyCommand {
    constructor() {
        super()
        this.label = "InsultSimulator";
        this.options = {
            description: "Insult whoever or whatever", 
            fullDescription: "Insult whoever or whatever", 
            aliases: ["Insult"], 
            usage: "[ThingOne]", 
            argsRequired: true,
            invalidUsageMessage: "Run the command again with something to Insult",
            caseInsensitive: true
        };
        this.generator = (msg, args) => this.run(msg, args)
    }

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        let name = args[0];
        let insult = lists.Insults[randomInt(lists.Insults.length)];
        let final = insult.replace(/~/g,name);
        global.bot.createMessage(msg.channel.id, final);
        return null //Return null so it doesnt send anything else
    }

}
