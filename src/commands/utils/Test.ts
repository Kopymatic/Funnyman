import { randomInt } from "crypto";
import Eris, { GeneratorFunctionReturn, Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import lists from "../../resources/lists.json";
import { global } from "../../main/global";

export class Test extends KopyCommand {
    constructor() {
        super()
        this.label = "Test";
        this.options = {
            description: "Test", 
            hidden: true,
            caseInsensitive: true
        };
        this.generator = (msg, args) => this.run(msg, args)
    }

    override run(msg: Message<TextableChannel>, args: string[]): string {
        if(msg.author.id === "326489320980611075") { //TODO make this use a list from a json or something
            throw new Error("Test error")
        }
        return null
    }
}
