import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";

export class Say extends KopyCommand {
    constructor() {
        super()
        this.label = "Say"; //Shows in the help menu
        this.options = {
            aliases: ["echo"],
            description: "Repeats what you say",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return args.join(" ")
        };
    }
}

export class Clap extends KopyCommand {
    constructor() {
        super()
        this.label = "Clap";
        this.options = {
            aliases: ["ac"],
            description: "Repeats what you say, but with claps",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return args.join(" :clap: ")
        };
    }
}

export class AddSpaces extends KopyCommand {
    constructor() {
        super()
        this.label = "AddSpaces";
        this.options = {
            aliases: ["as", "expand"],
            description: "Repeats what you say, but with more spaces",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return args.join(" ").split("").join(" ") //Jank to add spaces
        };
    }
}