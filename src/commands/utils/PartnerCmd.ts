import Eris, { Message, TextableChannel } from "eris";
import KopyCommand from "../../utilities/KopyCommand";
import global from "../../main/global";
import { Types, Styles } from "../../utilities/Components";
import { Partner } from "../../main/models";

export class PartnerCmd extends KopyCommand {
    constructor() {
        super();
        this.label = "Partner";
        this.options = {
            description: "Allows you to partner with other servers",
            fullDescription:
                "Allows you to partner with other servers, allowing them to see your NoContext, People, Pet, and Meme entries, and allowing you to see theirs",
            caseInsensitive: true,
            requirements: {
                permissions: {
                    administrator: true,
                },
            },
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override async run(msg: Message<TextableChannel>, args: Array<string>): Promise<string> {
        if (args.length == 0) {
            global.client.createMessage(msg.channel.id, {
                embeds: [
                    {
                        title: "Partnering 101",
                        description: `Partnering is a feature of ${global.name} that allows you to share your NoContext, People, Pet, and Memes entries with other Discord Servers. Resend this command with a valid guild id to partner.
                        \nPartnering is an advanced feature. Please refrain from using it unless you truly understand it. Ask Kopy if you have any questions.`,
                        color: global.defaultColor,
                    },
                ],
            });
            return;
        }

        const regex = /^(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)/g; //Yes this is a regex for guild ids.

        if (!regex.test(args[0])) {
            global.client.createMessage(msg.channel.id, {
                content:
                    "That does not appear to be a valid guild id! If you believe this to be an error," +
                    " contact Kopy through the about command and joining the support server.",
            });
            return;
        }

        const foundGuild = (await global.client.getRESTGuilds()).find(
            (element) => (element.id = args[0])
        );

        if (foundGuild == undefined || foundGuild == null) {
            global.client.createMessage(msg.channel.id, {
                content: "The bot isnt in that guild!",
            });
            return;
        }

        const foundOrCreated = await Partner.findOrCreate({
            where: {
                serverID: msg.guildID,
            },
        });

        const thisServer = foundOrCreated[0];

        const isPartnered = !(
            thisServer.partners === null ||
            thisServer.partners === undefined || //This logic might not be fucked any more
            !thisServer.partners.includes(args[0])
        );
        const canPartner = !isPartnered;

        const partnerButtonID = `${msg.id}:Partner`;
        const unpartnerButtonID = `${msg.id}:Unpartner`;
        global.client.createMessage(msg.channel.id, {
            embeds: [
                {
                    title: "Partnering 101",
                    description: `Partnering is a feature of ${global.name} that allows you to share your NoContext, People, Pet, and Memes entries with other Discord Servers.
                    \nPartnering is an advanced feature. Please refrain from using it unless you truly understand it. Ask Kopy if you have any questions.`,
                    color: global.defaultColor,
                },
            ],
            components: [
                {
                    type: Types.ActionRow,
                    components: [
                        {
                            type: Types.Button,
                            style: Styles.Success,
                            custom_id: partnerButtonID,
                            label: "Partner with this server",
                            disabled: canPartner,
                        },
                        {
                            type: Types.Button,
                            style: Styles.Danger,
                            custom_id: unpartnerButtonID,
                            label: "Unpartner with this server",
                            disabled: isPartnered,
                        },
                    ],
                },
            ],
        });

        global.client.on("interactionCreate", (interaction) =>
            this.handleInteraction(interaction, unpartnerButtonID, partnerButtonID)
        );

        setTimeout(() => {
            global.client.off("interactionCreate", (interaction) =>
                this.handleInteraction(interaction, unpartnerButtonID, partnerButtonID)
            );
        }, 120000);

        return null;
    }

    async handleInteraction(
        interaction: Eris.Interaction,
        unpartnerButtonID: string,
        partnerButtonID: string
    ): Promise<void> {
        if (interaction instanceof Eris.ComponentInteraction) {
            await interaction.acknowledge();
            if (interaction.id === unpartnerButtonID) {
                this.unpartner(interaction);
            } else if (interaction.id === partnerButtonID) {
                this.partner(interaction);
            } else {
                return;
            }
        }
    }

    unpartner(interaction: Eris.ComponentInteraction): void {
        return;
    }

    partner(interaction: Eris.ComponentInteraction): void {
        return;
    }
}
