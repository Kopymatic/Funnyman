import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import Lists from "../../resources/lists.json";
import { randomInt } from "crypto";

export class ChatDead extends KopyCommand {
    constructor() {
        super();
        this.label = "ChatDead";
        this.options = {
            description: "Sends a random question",
            fullDescription: "Sends a random question / conversation starter",
            usage: "Question type: [Would You Rather / wyr], [General questions / gq] (optional)",
            aliases: ["ded", "dead", "chatded"],
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    override async run(_msg: Message<TextableChannel>, _args: string[]): Promise<string> {
        if (
            Math.random() >
            Lists.ChatDead.WouldYouRather.length / Lists.ChatDead.GeneralQuestions.length
        ) {
            //Should give an even distribution
            return Lists.ChatDead.GeneralQuestions[
                randomInt(Lists.ChatDead.GeneralQuestions.length)
            ];
        } else {
            return Lists.ChatDead.WouldYouRather[randomInt(Lists.ChatDead.WouldYouRather.length)];
        }
    }
}
