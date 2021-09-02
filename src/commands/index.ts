import { KopyCommand } from "../utilities/KopyCommand";
import { Eval } from "./utils/EvalCmd";
import { OneVOne } from "./fun/OneVOneCmd";
import { Ping, Pong } from "./utils/PingCmd";
import { AddSpaces, Clap, Say } from "./convenience/QuickFormatCommands";

const commands: KopyCommand[] = [
    //convenience


    //fun
    new OneVOne(),
    
    //utils
    new Ping(), new Pong(),
    new Eval(),
    
    //QuickFormatCommands
    new Say(), new Clap(), new AddSpaces()
];

export default commands;