import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import { global } from "../../main/global";

export class ComplexEmbed extends KopyCommand {
    constructor() {
        super()
        this.label = "ComplexEmbed";
        this.options = {
            description: "Make a complex embed - ADVANCED USERS ONLY",
            usage: "Run the command with no args for help", 
            hidden: true,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args)
    }

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        if (args.join("") == "") {
            global.bot.createMessage(msg.channel.id, {
                embed: {
                    title: "How to use ComplexEmbed",
                    description: `Here is an example of how to use the ComplexEmbed command      
\`\`\`json\n
${global.prefix}complexEmbed
    "title": "Title of the embed",
    "description": "Description",
    "fields": [
        {
            "name": "Some extra info.",
            "value": "Some extra value.",
            "inline": true
        },
        {
            "name": "Some more extra info.",
            "value": "Another extra value.",
            "inline": true
        }
    ],
    "footer": { 
        "text": "Created with FunnymanBot."
    }
}
\`\`\`` //JS doesnt have a .trimindent function so the string needs to be like this to appear correctly
//Yes i am mad.
                }
            });
        } else {
            try {
                global.bot.createMessage(msg.channel.id, { embed: JSON.parse(args.join(" ")) } );
            } catch (_e) { //If we get an error let the user know, probably should be fancier
                let e: Error = _e;
                return e.message; 
            }
        }
        return null; //Return null so it doesnt send anything else
    }
}
