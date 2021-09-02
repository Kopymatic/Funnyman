import { KopyCommand } from "../utilities/KopyCommand";
import { Eval } from "./utils/Eval";
import { OneVOne } from "./fun/OneVOne";
import { Ping, Pong } from "./utils/Ping";
import { AddSpaces, Clap, Say } from "./convenience/QuickFormatCommands";
import { Test } from "./utils/Test";

const commands: KopyCommand[] = [
    //convenience


    //fun
    new OneVOne(),
    
    //utils
    new Ping(), new Pong(),
    new Eval(), new Test(),
    
    //QuickFormatCommands
    new Say(), new Clap(), new AddSpaces()
];

export default commands;