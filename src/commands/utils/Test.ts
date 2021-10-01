import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import {global} from "../../main/global"

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
                content: "Hi! This is a button test!",
                components: [{
                    components: [{
                        type: 2,
                        custom_id: `left_button`,
                        style: 1,
                        emoji: {
                            name: 'arrow_left',
                            id: '⬅️',
                        },
                    },],
                    type: 1                    
                }]
            });
        }
        return null
    }
}
