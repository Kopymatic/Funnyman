import { KopyCommand } from "../../utilities/KopyCommand";

export class Lenny extends KopyCommand {
    constructor() {
        super()
        this.label = "Lenny";
        this.options = {
            description: "( ͡° ͜ʖ ͡°)",
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => "( ͡° ͜ʖ ͡°)";
    }
}

export class LennyConcern extends KopyCommand {
    constructor() {
        super()
        this.label = "hmmm";
        this.options = {
            aliases: ["hmm", "hm", "hmmmm"],
            description: "( ͠° ͟ʖ ͡°)",
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => "( ͠° ͟ʖ ͡°)";
    }
}

export class RickRoll extends KopyCommand {
    constructor() {
        super()
        this.label = "RickRoll";
        this.options = {
            description: "May or may not be a rick roll",
            deleteCommand: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => "https://youtu.be/dQw4w9WgXcQ";
    }
}