import { KopyCommand } from "../../utilities/KopyCommand";

export class Ping extends KopyCommand { // Responds with "Pong!" when someone runs it
    constructor() {
        super()
        this.label = "Ping";
        this.options = {
            description: "Pong!", 
            fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.", 
            caseInsensitive: true
        };
        this.generator = "Pong";
    }
}

export class Pong extends KopyCommand { // Responds with random ping variation when someone runs it
    constructor() {
        super()
        this.label = "Pong";
        this.options = {
            description: "Ping!", 
            fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.", 
            caseInsensitive: true
        };
        this.generator = ["Pang!", "Peng!", "Ping!", "Pung!"];
    }
}
