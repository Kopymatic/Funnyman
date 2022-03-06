import { Message, TextableChannel } from "eris";
import KopyCommand from "../../utilities/KopyCommand";
import global from "../../main/global";
import { Types, Styles } from "../../utilities/Components";

export class About extends KopyCommand {
    constructor() {
        super();
        this.label = "About";
        this.options = {
            description: "Shows details about the bot",
            fullDescription: "Shows details about the bot",
            caseInsensitive: true,
        };
        this.generator = (msg) => this.run(msg);
    }

    override async run(msg: Message<TextableChannel>): Promise<string> {
        const githubEmoji = await global.client.getRESTGuildEmoji(
            "793293945437814797",
            "853144562201133066"
        );
        const discordEmoji = await global.client.getRESTGuildEmoji(
            "793293945437814797",
            "853144562222104596"
        );

        global.client.createMessage(msg.channel.id, {
            embeds: [
                {
                    title: `About ${global.name}`,
                    description:
                        "A passion project by Kopymatic. Started on <t:1605568200:D> and actively maintained.",
                    fields: [
                        {
                            name: "Statistics:",
                            value: `Up since **<t:${Math.round(
                                global.absoluteStartTime / 1000
                            )}:R>**`,
                            inline: false,
                        },
                    ],
                    color: global.defaultColor,
                },
            ],
            components: [
                {
                    type: Types.ActionRow,
                    components: [
                        {
                            type: Types.Button, //Button type
                            label: "GitHub",
                            style: Styles.Link,
                            url: "https://github.com/Kopymatic/Funnyman/",
                            emoji: githubEmoji,
                        },
                        {
                            type: Types.Button, //Button type
                            label: "Support Server",
                            style: Styles.Link,
                            url: "https://discord.gg/YBcveMYeDU",
                            emoji: discordEmoji,
                        },
                    ],
                },
            ],
        });
        return null;
    }
}
