import { randomInt } from "crypto";
import lists from "../../resources/lists.json";
import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";
import global from "../../main/global";

export default class InsultSimulator extends SlashCommand {
    constructor() {
        super();
        this.name = "Insult";
        this.description = "Insult somebody";
        this.options = [
            {
                name: "who",
                description: "Who to insult",
                type: CommandOptionTypes.USER,
                required: true,
            },
        ];
        this.onRun = async (interaction) => {
            const args = this.getOptions(interaction);
            const userID: string = args[0].value;
            const username = (await global.client.getRESTUser(userID)).username;
            const insult = lists.Insults[randomInt(lists.Insults.length)];
            const final = insult.replace(/~/g, username);
            interaction.createFollowup(final);
        };
    }
}
