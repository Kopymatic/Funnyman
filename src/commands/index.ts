import { KopyCommand } from "../utilities/KopyCommand";
import { Eval } from "./utils/Eval";
import { OneVOne } from "./fun/OneVOne";
import { Ping, Pong } from "./utils/Ping";
import { AddSpaces, Alphebetizer, Clap, OwOifier, RandomCaps, Reverser, Say } from "./convenience/QuickFormatCommands";
import { Test } from "./utils/Test";
<<<<<<< HEAD
import { ComplexEmbed } from "./utils/EmbedCommands";
import { Lenny, LennyConcern, RickRoll } from "./convenience/QuickStringCommands";
=======
import { InsultSimulator } from "./fun/InsultSimulator";
>>>>>>> Kopy/master

const commands: KopyCommand[] = [
    //convenience


    //fun
    new OneVOne(), new InsultSimulator(),
    
    //utils
    new Ping(), new Pong(), new ComplexEmbed(),
    new Eval(), new Test(),
    
    //QuickFormatCommands
    new Say(), new Clap(), new AddSpaces(), new OwOifier(), new Reverser(),
    new Alphebetizer(), new RandomCaps(),

    //QuickStringCommands
    new Lenny(), new LennyConcern(), new RickRoll(),
];

export default commands;