import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import {global} from "../../main/global"
import { Types, Styles } from "../../utilities/Components";

export class Test extends KopyCommand {
    constructor() {
        super()
        this.label = "Test";
        this.options = {
            description: "Test", 
            hidden: true,
            caseInsensitive: true
        };
        this.generator = (msg, args) => this.run(msg, args)
    }

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        if(msg.author.id === "326489320980611075") { //TODO make this use a list from a json or something
            global.bot.createMessage(msg.channel.id, {
                content: "This is a message with components",
                components: [
                    {
                        type: Types.ActionRow,
                        components: [
                            {
                                type: Types.Button, //Button type
                                label: "Click me!",
                                style: Styles.Primary,
                                custom_id: "click_qwe"
                            },
                            {
                                type: Types.Button, //Button type
                                label: "Click me!",
                                style: Styles.Secondary,
                                custom_id: "click_oqweqe"
                            },
                            {
                                type: Types.Button, //Button type
                                label: "Click me!",
                                style: Styles.Success,
                                custom_id: "click_oqweqwene"
                            },
                            {
                                type: Types.Button, //Button type
                                label: "Click me!",
                                style: Styles.Danger,
                                custom_id: "click_oqwewdfwsdne"
                            }
                        ]
                    },
                    {
                        type: Types.ActionRow,
                        components: [{
                            type: Types.Button, //Button type
                            label: "Google",
                            style: Styles.Link,
                            url: "https://google.com",
                        }]
                    }
                ]
            });
        }
        return null
    }
}
