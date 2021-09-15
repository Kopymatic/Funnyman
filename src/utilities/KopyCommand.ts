import { CommandGenerator, CommandOptions, Message, TextableChannel } from "eris";

export class KopyCommand { 
    label: string;
    generator: CommandGenerator;
    options: CommandOptions;
    subcommands: KopyCommand[] = [];

    async run(msg: Message<TextableChannel>, args: String[]): Promise<string> { return }
}