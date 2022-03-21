import { ResponseFlags, SlashCommand } from "@kopymatic/basebot";

export default class NoContextSlaCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "NoContext";
        this.description = "NoContext is currently only available through ppNoContext";
        this.onRun = (interaction) => {
            interaction.createFollowup({
                content: "NoContext is currently only available through ppNoContext",
                flags: ResponseFlags.EPHEMERAL,
            });
        };
    }
}
