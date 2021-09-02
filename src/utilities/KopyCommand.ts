import { CommandGenerator, CommandOptions, Message, TextableChannel } from "eris";

export class KopyCommand { 
    label: string;
    generator: CommandGenerator;
    options: CommandOptions;
    subcommands: KopyCommand[] = [];

    run(msg: Message<TextableChannel>, args: String[]): string { return }
}