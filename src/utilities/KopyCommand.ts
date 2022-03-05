/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandGenerator, CommandOptions, Message, TextableChannel } from "eris";

export default class KopyCommand {
    label: string;
    generator: CommandGenerator;
    options: CommandOptions;
    subcommands: KopyCommand[] = [];

    async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        return;
    }
}
