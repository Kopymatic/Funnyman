import Lists from "../../resources/lists.json";
import { randomInt } from "crypto";
import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";

export default class ChatDeadCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "ChatDead";
        this.description = "Sends a random question to hopefully revive the chat.";
        this.options = [
            {
                name: "type",
                description: "The type of the question",
                type: CommandOptionTypes.STRING,
                required: false,
                choices: [
                    {
                        name: "Would You Rather",
                        value: "wyr",
                    },
                    {
                        name: "General Question",
                        value: "gq",
                    },
                ],
            },
        ];
        this.onRun = (interaction) => {
            const choice = this.getOptions(interaction);
            let questionType: string;
            if (choice) {
                questionType = choice[0].value;
            } else {
                questionType = Math.random() < 0.5 ? "wyr" : "gq";
            }

            let question: string;
            if (questionType == "wyr") {
                question =
                    Lists.ChatDead.WouldYouRather[randomInt(Lists.ChatDead.WouldYouRather.length)];
            } else {
                question =
                    Lists.ChatDead.GeneralQuestions[
                        randomInt(Lists.ChatDead.GeneralQuestions.length)
                    ];
            }
            interaction.createFollowup(question);
        };
    }
}
