import { Message, TextableChannel } from "eris";
import KopyCommand from "../../utilities/KopyCommand";
import global from "../../main/global";
import { Bug } from "../../main/models";
import config from "../../resources/config.json";

export class BugReport extends KopyCommand {
    bugChannel = config.bugChannelId;

    constructor() {
        super();
        this.label = "BugReport";
        this.options = {
            aliases: ["bug"],
            description: "Report a bug!",
            fullDescription: "Report a bug!",
            caseInsensitive: true,
            cooldown: 60,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override async run(msg: Message<TextableChannel>, args: Array<string>): Promise<string> {
        if (args[0] == "delete" && msg.author.id === "326489320980611075") {
            const toDelete = await Bug.findByPk(args[1]);
            if (toDelete === null) {
                global.client.createMessage(msg.channel.id, {
                    content: "That id doesnt exist!",
                    messageReference: { messageID: msg.id },
                });
                return;
            }
            global.client.deleteMessage(this.bugChannel, toDelete.messageID, "Rejected/Fixed");
            toDelete.destroy();
            return;
        }

        const newRow = await Bug.create();

        let attachments = "";
        if (msg.attachments.length > 0) {
            msg.attachments.forEach(
                (attachment) => (attachments = attachments + " " + attachment.url)
            );
        } else {
            attachments = "None";
        }

        const bugMessage = await global.client.createMessage(this.bugChannel, {
            embeds: [
                {
                    author: {
                        name: `${msg.author.username} (${msg.author.id})`,
                        icon_url: msg.author.avatarURL,
                    },
                    title: "New Bug Report - ID " + newRow.id,
                    description: args.join(" "),
                    fields: [
                        // {
                        //     name: "Shard",
                        //     value: global.bot.guilds.find((guild) => guild.id == msg.guildID).shard.id.toString(),
                        //     inline: true,
                        // },
                        // {
                        //     name: "Guild",
                        //     value: `${global.bot.guilds.find((guild) => guild.id == msg.guildID).name} \n\`${
                        //         msg.guildID
                        //     }\``,
                        //     inline: true,
                        // },
                        {
                            name: "Attachments",
                            value: attachments,
                            inline: true,
                        },
                        // {
                        //     name: "Jump Link",
                        //     value: msg.jumpLink,
                        //     inline: true,
                        // },
                    ],
                },
            ],
        });

        newRow.messageID = bugMessage.id;
        newRow.save();
        return null;
    }
}
