import global from "../../main/global";
import { Types, Styles } from "../../utilities/Components";
import { SlashCommand } from "@kopymatic/basebot";

export class About extends SlashCommand {
    constructor() {
        super();
        this.name = "About";
        this.description = "About FunnymanBot";
        this.onRun = async (interaction) => {
            const githubEmoji = await global.client.getRESTGuildEmoji(
                "793293945437814797",
                "853144562201133066"
            );
            const discordEmoji = await global.client.getRESTGuildEmoji(
                "793293945437814797",
                "853144562222104596"
            );

            interaction.createFollowup({
                embeds: [
                    {
                        title: `About ${global.name}`,
                        description:
                            "A passion project by Kopymatic. Started on <t:1605568200:D> and actively maintained.",
                        fields: [
                            {
                                name: "Statistics:",
                                value: `Up since **<t:${Math.round(
                                    global.bot.startTime.getTime() / 1000
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
        };
    }
}
