import { randomInt } from "crypto";
import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";

export default class ChooseCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "Choose";
        this.description = "Choose between a bunch of comma seperated values";
        this.options = [
            {
                name: "options",
                description: "The options to choose from, seperated by commas",
                type: CommandOptionTypes.STRING,
                required: true,
            },
        ];
        this.onRun = (interaction) => {
            const choices: string = this.getOptions(interaction)[0].value;
            const split = choices.split(",");
            interaction.createFollowup("I choose " + split[randomInt(split.length)].trim());
        };
    }
}
