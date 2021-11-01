/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import {global} from "../../main/global"
import { Types, Styles } from "../../utilities/Components";
import { ButtonPaginator } from "../../utilities/ButtonPaginator";


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
            const message = await global.bot.createMessage(msg.channel.id, {content:"Loading..."});
            new ButtonPaginator(global.bot, message,
            {
                startingPage: 0,
                allowedUsers: [msg.author.id],
                maxTime: 100000,
                pages: []
            })
        }
        return null
    }
}
