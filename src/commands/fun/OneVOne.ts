import { randomInt } from "crypto";
import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import lists from "../../resources/lists.json";
import { global } from "../../main/global";

export class OneVOne extends KopyCommand {
    constructor() {
        super();
        this.label = "OneVOne";
        this.options = {
            description: "Pit two things against eachother",
            fullDescription:
                "Pit two things against eachother - use by sending the command with two things seperated by a space",
            aliases: ["1v1"],
            usage: "[ThingOne] [ThingTwo]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with two things, seperated by a space",
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        const title = lists.OneVOne.titles[randomInt(lists.OneVOne.titles.length)];
        const action = lists.OneVOne.actions[randomInt(lists.OneVOne.actions.length)];
        const descriptor = lists.OneVOne.descriptors[randomInt(lists.OneVOne.descriptors.length)];

        let first; //vars to store the first and second name
        let second;
        if (args.length == 1) {
            first = msg.author.mention;
            second = args[0];
        } else {
            first = args[0];
            second = args[1];
        }

        //Scramble the options so that its random
        if (Math.random() < 0.5) {
            const temp = first;
            first = second;
            second = temp;
        }

        //Create and send the embed
        global.bot.createMessage(msg.channel.id, {
            embed: {
                title: title, // Set the title to our title variable
                description: `${first} **${action}** ${second} **${descriptor}**`, //Use FancyString(TM) to quickly format the desc
                color: global.defaultColor, // Color, either in hex (show), or a base-10 integer
            },
        });
        return null; //Return null so it doesnt send anything else
    }
}
