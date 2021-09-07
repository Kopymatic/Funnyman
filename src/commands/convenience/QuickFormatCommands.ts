import { Message, TextableChannel } from "eris";
import { buffer } from "stream/consumers";
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

export class OwOifier extends KopyCommand {
    constructor() {
        super()
        this.label = "OwOifier";
        this.options = {
            aliases: ["owo", "uwu"],
            description: "Repeats what you say, but uwu",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return args.join(" ") //TODO Replace this with a better regex for the love of god
                .replace(/o /g , "owo ")
                .replace(/O /g, "OwO ")
                .replace(/u /g, "uwu ")
                .replace(/U /g, "UwU ")
                .replace(/ o/g, " owo")
                .replace(/ O/g, " OwO")
                .replace(/ u/g, " uwu")
                .replace(/ U/g, " UwU")
                .replace(/l/g, "w")
                .replace(/L/g, "W")
                .replace(/y /g, "ie ")
                .replace(/Y /g, "IE ")
                .replace(/r/g, "w")
                .replace(/R/g, "W");
        };
    }
}

//Doesnt work
/* export class Base64Encode extends KopyCommand {
    constructor() {
        super()
        this.label = "Base64Encode";
        this.options = {
            aliases: ["b64e", "b64encode", "encode"],
            description: "Repeats what you say, but in Base64",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return Buffer.from(args.join(" "), "base64").join("")
        };
    }
}

export class Base64Decode extends KopyCommand {
    constructor() {
        super()
        this.label = "Base64Decode";
        this.options = {
            aliases: ["b64d", "b64decode", "decode"],
            description: "Repeats what you say, but in readable text",
            usage: "[Base64]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            return Buffer.from(args.join(" "), "ascii").join("")
        };
    }
}
*/
export class Reverser extends KopyCommand {
    constructor() {
        super()
        this.label = "Reverser";
        this.options = {
            aliases: ["reverse", "rev",],
            description: "Repeats what you say, but reversed",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            let text = args.join(" ");
            let newText = "";
            let charList = text.split("");
            
            for (let i = charList.length - 1; i > 0; i--) {
                newText += charList[i];
            }
            return newText;
        };
    }
}

export class Alphebetizer extends KopyCommand {
    constructor() {
        super()
        this.label = "Alphebetizer";
        this.options = {
            aliases: ["alph",],
            description: "Repeats what you say, but alphebetized",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            let text = args.join(" ");
            let charList = text.split("");
            charList.sort(); //Sort alphebetically
            return charList.join("");
        };
    }
}

export class RandomCaps extends KopyCommand {
    constructor() {
        super()
        this.label = "RandomCaps";
        this.options = {
            aliases: ["randcaps", "rc"],
            description: "Repeats what you say, but wItH raNDoM caPS",
            usage: "[Text]",
            invalidUsageMessage: "Send the command with arguments!",
            argsRequired: true,
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => {
            let text = args.join(" ");
            let finalText = "";
            for (let i = 0; i < text.length; i++) {
                let element = text.charAt(i);
                if (0.5 > Math.random()) {
                    finalText += element.toUpperCase();
                } else {
                    finalText += element.toLowerCase();
                }
            }
            return finalText;
        };
    }
}