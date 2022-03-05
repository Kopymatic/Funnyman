import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import global from "../../main/global";

/*
----------
UNFINISHED
----------
*/

export class UpdateStatus extends KopyCommand {
    constructor() {
        super();
        this.label = "UpdateStatus";
        this.options = {
            description: "Updates the bots status",
            aliases: ["us"],
            hidden: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        if (msg.author.id == "326489320980611075") {
            //TODO make this use a list from a json or something
            global.bot.shards.entries();
        }
        return null;
    }
}
