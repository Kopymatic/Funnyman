import { KopyCommand } from "../utilities/KopyCommand";
import { Eval } from "./utils/Eval";
import { About } from "./utils/About";
import { OneVOne } from "./fun/OneVOne";
import { Ping, Pong } from "./utils/Ping";
import {
    AddSpaces,
    Alphebetizer,
    Clap,
    OwOifier,
    RandomCaps,
    Reverser,
    Say,
} from "./convenience/QuickFormatCommands";
import { Test } from "./utils/Test";
import { ComplexEmbed } from "./utils/EmbedCommands";
import { Lenny, LennyConcern, RickRoll } from "./convenience/QuickStringCommands";
import { InsultSimulator } from "./fun/InsultSimulator";
import { Cuddle, HandHold, HeadPat, Hug, Kiss } from "./fun/LoveCommands";
import { ChatDead } from "./fun/ChatDead";
import { MemeCmd, NoContextCmd, PeopleCmd, PetCmd } from "../commands/fun/RandomImageCommands";

const commands: KopyCommand[] = [
    //convenience

    //fun
    new OneVOne(),
    new InsultSimulator(),
    new Hug(),
    new Kiss(),
    new Cuddle(),
    new HandHold(),
    new HeadPat(),
    new ChatDead(),
    new NoContextCmd(),
    new PeopleCmd(),
    new PetCmd(),
    new MemeCmd(),

    //utils
    new Ping(),
    new Pong(),
    new ComplexEmbed(),
    new Eval(),
    new Test(),
    new About(),

    //QuickFormatCommands
    new Say(),
    new Clap(),
    new AddSpaces(),
    new OwOifier(),
    new Reverser(),
    new Alphebetizer(),
    new RandomCaps(),

    //QuickStringCommands
    new Lenny(),
    new LennyConcern(),
    new RickRoll(),
];

export default commands;
