import KopyCommand from "../../utilities/KopyCommand";
import { randomInt } from "crypto";

export class ChooseCmd extends KopyCommand {
    constructor() {
        super();
        this.label = "Choose";
        this.options = {
            description: "Pick from a list you supply. Separate arguments with `/`",
            fullDescription: "Pick from a list you supply. Separate arguments with `/`",
            usage: "[Thing1 / Thing2 / Thing3...]",
            aliases: ["pick"],
            caseInsensitive: true,
        };
        this.generator = (msg, args) =>
            `I pick ${args.join(" ").split("/")[randomInt(args.length)].trim()}`;
    }
}
