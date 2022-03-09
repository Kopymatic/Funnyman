import { randomInt } from "crypto";
import lists from "../../resources/lists.json";
import global from "../../main/global";
import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";

export class OneVOneCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "OneVOne";
        this.description = "Battle it out between two things to see which is better";
        this.options = [
            {
                name: "thing1",
                description: "The first fighter",
                type: CommandOptionTypes.STRING,
                required: true,
            },
            {
                name: "thing2",
                description: "The second fighter",
                type: CommandOptionTypes.STRING,
                required: true,
            },
        ];
        this.onRun = (interaction) => {
            const title = lists.OneVOne.titles[randomInt(lists.OneVOne.titles.length)];
            const action = lists.OneVOne.actions[randomInt(lists.OneVOne.actions.length)];
            const descriptor =
                lists.OneVOne.descriptors[randomInt(lists.OneVOne.descriptors.length)];

            const options = this.getOptions(interaction);
            const args = [options[0].value, options[1].value];
            let first = args[0]; //vars to store the first and second name
            let second = args[1];

            //Scramble the options so that its random
            if (Math.random() < 0.5) {
                const temp = first;
                first = second;
                second = temp;
            }

            //Create and send the embed
            interaction.createFollowup({
                embeds: [
                    {
                        title: title, // Set the title to our title variable
                        description: `${first} **${action}** ${second} **${descriptor}**`, //Use FancyString(TM) to quickly format the desc
                        color: global.defaultColor, // Color, either in hex (show), or a base-10 integer
                    },
                ],
            });
        };
    }
}
