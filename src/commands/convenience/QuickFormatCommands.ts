import { CommandOptionTypes, SlashCommand } from "@kopymatic/basebot";

export default class FormatCmd extends SlashCommand {
    constructor() {
        super();
        this.name = "format";
        this.description = "Format whatever you want, in a variety of ways.";
        this.options = [
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "say",
                description: "Repeats what you say",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "clap",
                description: "Says what you say, but with claps",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "addspaces",
                description: "PLACEHOLDER",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "owo",
                description: "PLACEHOLDER",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "reverse",
                description: "PLACEHOLDER",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "alphebetize",
                description: "PLACEHOLDER",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
            {
                type: CommandOptionTypes.SUB_COMMAND,
                name: "randomcaps",
                description: "PLACEHOLDER",
                options: [
                    {
                        name: "text",
                        description: "The text to format",
                        type: CommandOptionTypes.STRING,
                        required: true,
                    },
                ],
            },
        ];
        this.onRun = (interaction) => {
            const option = this.getOptions(interaction)[0];
            const text: string = option.options[0].value;
            switch (option.name) {
                case "say":
                    interaction.createFollowup(text.slice(0, 2000));
                    break;
                case "clap":
                    interaction.createFollowup(text.split(" ").join(" :clap: ").slice(0, 2000));
                    break;
                case "addspaces":
                    interaction.createFollowup(text.split("").join(" ").slice(0, 2000));
                    break;
                case "owo":
                    interaction.createFollowup(
                        text
                            .replace(/o /g, "owo ")
                            .replace(/O /g, "OwO ")
                            .replace(/u /g, "uwu ")
                            .replace(/U /g, "UwU ")
                            .replace(/ o/g, " owo")
                            .replace(/ O/g, " OwO")
                            .replace(/ u/g, " uwu")
                            .replace(/ U/g, " UwU")
                            .replace(/l/g, "w")
                            .replace(/L/g, "W")
                            .replace(/y /g, "ie ")
                            .replace(/Y /g, "IE ")
                            .replace(/r/g, "w")
                            .replace(/R/g, "W")
                            .slice(0, 2000)
                    );
                    break;
                case "reverse":
                    {
                        let newText = "";
                        const charList = text.split("");

                        for (let i = charList.length - 1; i > 0; i--) {
                            newText += charList[i];
                        }
                        interaction.createFollowup(newText.slice(0, 2000));
                    }
                    break;
                case "alphebetize":
                    {
                        const charList = text.split("");
                        charList.sort(); //Sort alphebetically
                        interaction.createFollowup(charList.join("").slice(0, 2000));
                    }
                    break;
                case "randomcaps":
                    {
                        let finalText = "";
                        for (let i = 0; i < text.length; i++) {
                            const element = text.charAt(i);
                            if (0.5 > Math.random()) {
                                finalText += element.toUpperCase();
                            } else {
                                finalText += element.toLowerCase();
                            }
                        }
                        interaction.createFollowup(finalText.slice(0, 2000));
                    }
                    break;
                default:
                    interaction.createFollowup("Not yet implemented");
                    break;
            }
        };
    }
}
