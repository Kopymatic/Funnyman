import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";

export default class PollCmd extends SlashCommand {
    numberEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    thumbsUp = "👍";
    thumbsDown = "👎";

    constructor() {
        super();
        this.name = "Poll";
        this.description = "Create a poll";
        this.options = [
            {
                name: "text",
                description: "The text to send the poll with",
                type: CommandOptionTypes.STRING,
                required: true,
            },
            {
                name: "options",
                description: "The amount of options. Leave blank for a yes or no question.",
                type: CommandOptionTypes.NUMBER,
                max_value: 10 as null,
                min_value: 1 as null, //The type of this is null. thanks eris!
                required: false,
            },
        ];
        this.onRun = async (interaction) => {
            const options = this.getOptions(interaction);
            await interaction.createFollowup(options[0].value);
            const message = await interaction.getOriginalMessage();

            if (options[1]) {
                for (let i = 0; i < options[1].value; i++) {
                    message.addReaction(this.numberEmojis[i]);
                }
            } else {
                message.addReaction(this.thumbsUp);
                message.addReaction(this.thumbsDown);
            }
        };
    }
}
