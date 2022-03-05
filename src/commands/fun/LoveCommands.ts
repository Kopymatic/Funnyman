import { Message, TextableChannel } from "eris";
import KopyCommand from "../../utilities/KopyCommand";
import global from "../../main/global";
import { LoveCommand } from "../../main/models";
import lists from "../../resources/lists.json";
import { randomInt } from "crypto";

abstract class LoveCommands extends KopyCommand {
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

    override async run(msg: Message<TextableChannel>): Promise<string> {
        if (msg.mentions.length > 0) {
            const user = msg.member;
            const mention = await global.bot.getRESTGuildMember(msg.guildID, msg.mentions[0].id);
            const userID = user.id; // The user id duh
            const mentionID = mention.id; //The id of the first user mentioned
            let result: LoveCommand;

            //Here's where we do database shit. Oh boy.
            await LoveCommand.findOne({
                where: {
                    senderid: userID,
                    receiverid: mentionID,
                    actionidentifier: this.actionIdentifier,
                },
            }).then((res) => {
                result = res;
            });
            if (result != null) {
                result.timesperformed++;
                result.save();
            } else {
                const newRow = await LoveCommand.create({
                    senderid: userID,
                    receiverid: mentionID,
                    actionidentifier: this.actionIdentifier,
                    timesperformed: 1,
                });
                result = newRow;
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

            msg.channel.createMessage({
                embed: {
                    title: `${userName} ${this.embedTitleText} ${mentionName}`,
                    image: { url: this.gifs[randomInt(this.gifs.length)] },
                    footer: {
                        text: `That's ${result.timesperformed} ${this.embedFooterText} now!`,
                    },
                    color: global.defaultColor,
                },
            });
        }
        return null;
    }
}

export class Hug extends LoveCommands {
    constructor() {
        super();
        this.label = "Hug";
        this.options = {
            description: "Hug somebody!",
            fullDescription: "Hug somebody!",
            usage: "[User as @mention]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with mention!",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);

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
        this.label = "Kiss";
        this.options = {
            description: "Kiss somebody!",
            fullDescription: "Kiss somebody!",
            usage: "[User as @mention]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with mention!",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);

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
        this.label = "Cuddle";
        this.options = {
            description: "Cuddle somebody!",
            fullDescription: "Cuddle somebody!",
            usage: "[User as @mention]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with mention!",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);

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
        this.label = "HandHold";
        this.options = {
            description: "Hold hands with somebody!",
            fullDescription: "Hold hands with somebody!",
            usage: "[User as @mention]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with mention!",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);

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
        this.label = "HeadPat";
        this.options = {
            description: "Headpat somebody!",
            fullDescription: "Headpat somebody!",
            usage: "[User as @mention]",
            argsRequired: true,
            invalidUsageMessage: "Run the command again with mention!",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);

        //LoveCommand options
        this.reactionPercent = 30;
        this.actionIdentifier = "head";
        this.embedTitleText = "headpats";
        this.embedFooterText = "headpats";
        this.gifs = lists.LoveCommands.HeadPatGifs;
    }
}
