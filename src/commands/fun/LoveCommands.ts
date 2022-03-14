import global from "../../main/global";
import { LoveCommand } from "../../main/models";
import lists from "../../resources/lists.json";
import { randomInt } from "crypto";
import {
    ButtonStyles,
    CommandOptionTypes,
    ComponentTypes,
    Menu,
    SlashCommand,
} from "@kopymatic/basebot";
import { ComponentInteraction, InteractionButton, InteractionContent } from "eris";

abstract class LoveCommands extends SlashCommand {
    /**
     * Array of gifs the command can pick from
     */
    protected gifs: string[] = null;
    /**
     * The ActionIdentifier is 4 characters that will be used to identify this conmmand in the database
     */
    protected actionIdentifier: string = null;
    /**
     * The title text used in the embed
     * Example:
     * "(user) (embedTitleText) (otheruser)"
     * "That's (number) (embedFooterText) now!"
     */
    protected embedTitleText: string = null;

    /**
     * The footer text used in the embed
     * Example:
     * "(user) (embedTitleText) (otheruser)"
     * "That's (number) (embedFooterText) now!"
     */
    protected embedFooterText: string = null;

    /**
     * When a command is issued, there's a percent chance that it will react with an emoji. This is where those emojis are stored.
     * Must be properly formatted. Ask Kopy. Defaults to a bunch of hearts.
     */
    protected possibleReactions = [
        "U+2764",
        "U+1F496",
        "U+1F497",
        "U+1F49F",
        "U+2763",
        "U+1F49D",
        "U+1F49E",
        "U+1F495",
        "U+1F493",
    ];

    /**
     * The percentage chance of a reaction. Set to 0 to never have any, set to 100 to always have them.
     * Default of 33
     */
    protected reactionPercent = 33;

    /**
     * Because funny sex number.
     */
    private sixtyNineGifs = [
        "https://media1.tenor.com/images/552432b67854256e7b51ab96c86d8b80/tenor.gif",
    ];

    constructor() {
        super();
        this.options = [
            {
                name: "user",
                description: "The user to do this action to",
                type: CommandOptionTypes.USER,
                required: true,
            },
        ];
        this.onRun = async (interaction) => {
            if (this.isInDm(interaction)) {
                interaction.createFollowup("This command is only meant to be used in servers.");
                return;
            }

            const user = interaction.member;
            const mention = await global.client.getRESTGuildMember(
                interaction.guildID,
                this.getOptions(interaction)[0].value
            );
            const userID = user.id; // The user id duh
            const mentionID = mention.id; //The id of the first user mentioned
            let dbEntry: LoveCommand;

            //Here's where we do database shit. Oh boy.
            await LoveCommand.findOne({
                where: {
                    senderid: userID,
                    receiverid: mentionID,
                    actionidentifier: this.actionIdentifier,
                },
            }).then((res) => {
                dbEntry = res;
            });

            if (dbEntry != null) {
                dbEntry.timesperformed++;
                dbEntry.save();
            } else {
                const newRow = await LoveCommand.create({
                    senderid: userID,
                    receiverid: mentionID,
                    actionidentifier: this.actionIdentifier,
                    timesperformed: 1,
                });
                dbEntry = newRow;
            }

            let userName: string;
            if (user.nick == null) {
                userName = user.username;
            } else {
                userName = user.nick;
            }
            let mentionName: string;
            if (mention.nick == null) {
                mentionName = mention.username;
            } else {
                mentionName = mention.nick;
            }

            const button: InteractionButton = {
                type: ComponentTypes.Button,
                style: ButtonStyles.Primary,
                custom_id: `${Math.random()}|${this.name}`,
                label: `Return the ${this.name}`,
            };

            const message: InteractionContent = {
                embeds: [
                    {
                        title: `${userName} ${this.embedTitleText} ${mentionName}`,
                        image: {
                            url: dbEntry.timesperformed.toString().includes("69")
                                ? this.sixtyNineGifs[randomInt(this.sixtyNineGifs.length)]
                                : this.gifs[randomInt(this.gifs.length)],
                        },
                        footer: {
                            text: `That's ${dbEntry.timesperformed} ${this.embedFooterText} now!`,
                        },
                        color: global.defaultColor,
                    },
                ],
                components: [
                    {
                        type: ComponentTypes.ActionRow,
                        components: [button],
                    },
                ],
            };

            new Menu(
                global.client,
                interaction,
                message,
                [
                    {
                        button: button,
                        func: async (interaction: ComponentInteraction) => {
                            button.disabled = true;
                            (await interaction.getOriginalMessage()).edit({
                                embeds: message.embeds,
                                components: [
                                    {
                                        type: ComponentTypes.ActionRow,
                                        components: [button],
                                    },
                                ],
                            });

                            await LoveCommand.findOne({
                                where: {
                                    senderid: mentionID,
                                    receiverid: userID,
                                    actionidentifier: this.actionIdentifier,
                                },
                            }).then((res) => {
                                dbEntry = res;
                            });

                            if (dbEntry != null) {
                                dbEntry.timesperformed++;
                                dbEntry.save();
                            } else {
                                const newRow = await LoveCommand.create({
                                    senderid: mentionID,
                                    receiverid: userID,
                                    actionidentifier: this.actionIdentifier,
                                    timesperformed: 1,
                                });
                                dbEntry = newRow;
                            }

                            let userName: string;
                            if (user.nick == null) {
                                userName = user.username;
                            } else {
                                userName = user.nick;
                            }
                            let mentionName: string;
                            if (mention.nick == null) {
                                mentionName = mention.username;
                            } else {
                                mentionName = mention.nick;
                            }

                            const message2: InteractionContent = {
                                embeds: [
                                    {
                                        title: `${mentionName} ${this.embedTitleText} ${userName}`,
                                        image: {
                                            url: dbEntry.timesperformed.toString().includes("69")
                                                ? this.sixtyNineGifs[
                                                      randomInt(this.sixtyNineGifs.length)
                                                  ]
                                                : this.gifs[randomInt(this.gifs.length)],
                                        },
                                        footer: {
                                            text: `That's ${dbEntry.timesperformed} ${this.embedFooterText} now!`,
                                        },
                                        color: global.defaultColor,
                                    },
                                ],
                            };

                            interaction.createFollowup(message2);
                        },
                    },
                ],
                {
                    allowedUsers: [mentionID],
                    maxTime: 60000,
                }
            );
        };
    }
}

export class Hug extends LoveCommands {
    constructor() {
        super();
        this.name = "Hug";
        this.description = "Hug somebody!";
        //LoveCommand options
        this.reactionPercent = 40;
        this.possibleReactions = ["U+2764", "U+1F49B"];
        this.actionIdentifier = "hugg";
        this.embedTitleText = "hugs";
        this.embedFooterText = "hugs";
        this.gifs = lists.LoveCommands.HugGifs;
    }
}

export class Kiss extends LoveCommands {
    constructor() {
        super();
        this.name = "Kiss";
        this.description = "Kiss somebody!";
        //LoveCommand options
        this.reactionPercent = 60;
        this.actionIdentifier = "kiss";
        this.embedTitleText = "kisses";
        this.embedFooterText = "kisses";
        this.gifs = lists.LoveCommands.KissGifs;
    }
}

export class Cuddle extends LoveCommands {
    constructor() {
        super();
        this.name = "Cuddle";
        this.description = "Cuddle somebody!";
        //LoveCommand options
        this.reactionPercent = 85;
        this.actionIdentifier = "cudd";
        this.embedTitleText = "cuddles with";
        this.embedFooterText = "cuddles";
        this.gifs = lists.LoveCommands.CuddleGifs;
    }
}

export class HandHold extends LoveCommands {
    constructor() {
        super();
        this.name = "HandHold";
        this.description = "Hold hands with somebody";
        //LoveCommand options
        this.reactionPercent = 70;
        this.actionIdentifier = "hand";
        this.embedTitleText = "holds hands with";
        this.embedFooterText = "times";
        this.gifs = lists.LoveCommands.HandHoldGifs;
    }
}

export class HeadPat extends LoveCommands {
    constructor() {
        super();
        this.name = "HeadPat";
        this.description = "Pat somebody on the head!";
        //LoveCommand options
        this.reactionPercent = 30;
        this.actionIdentifier = "head";
        this.embedTitleText = "headpats";
        this.embedFooterText = "headpats";
        this.gifs = lists.LoveCommands.HeadPatGifs;
    }
}
