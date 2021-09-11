import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";

export class Eval extends KopyCommand {
    constructor() {
        super()
        this.label = "Eval";
        this.options = {
            description: "Run any javascript code",
            argsRequired: true,
            caseInsensitive: true,
            hidden: true,
        };
        this.generator = (msg, args) => this.run(msg, args);
    }

    override run(msg: Message<TextableChannel>, args: string[]): string {
        if(msg.author.id === "326489320980611075") { //TODO make this use a list from a json or something
            let prefix = msg.content.split(" ")[0];
            try {
                console.log(`Evaluating ${args.join(" ")}`)
                return `\`\`\`${eval(msg.content.replace(prefix, ""))}\`\`\``
            } catch (_e) {
                let e: Error = _e;
                return `An error occured! \`\`\`${e.name}\n${e.message}\n${e.stack}\`\`\``
            }
        } else {
            return "You're not allowed to use this command!"
        }
    }
}
