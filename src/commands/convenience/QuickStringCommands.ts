import { SlashCommand } from "@kopymatic/basebot";

export class LennyCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "lenny";
        this.description = "( ͡° ͜ʖ ͡°)";
        this.onRun = (interaction) => {
            interaction.createFollowup("( ͡° ͜ʖ ͡°)");
        };
    }
}
