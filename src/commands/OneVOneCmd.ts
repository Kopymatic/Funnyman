import { randomInt } from "crypto";
import Eris, { Message, TextableChannel } from "eris";
import { KopyCommand } from "../main/KopyCommand";

export class OneVOne extends KopyCommand {
    constructor() {
        super()
        this.label = "OneVOne";
        this.options = {
            description: "Pit two things against eachother", 
            fullDescription: "Pit two things against eachother - use by sending the command with two things seperated by a space", 
            aliases: ["1v1"], 
            usage: "[ThingOne] [Thing2]", 
            argsRequired: true,
            invalidUsageMessage: "Run the command again with two things, seperated by a space",
            caseInsensitive: true
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override run(msg: Message<TextableChannel>, args: string[]): string {
        return args[randomInt(args.length)]
    }
}
