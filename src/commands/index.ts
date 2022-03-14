import KopyCommand from "../utilities/KopyCommand";
import { Eval } from "./utils/Eval";
import { About } from "./utils/About";
import { OneVOneCmd } from "./fun/OneVOne";
import { Ping, Pong } from "./utils/Ping";
import { Test } from "./utils/Test";
import { ComplexEmbed } from "./utils/EmbedCommands";
import { LennyCmd } from "./convenience/QuickStringCommands";
import InsultSimulator from "./fun/InsultSimulator";
import { Cuddle, HandHold, HeadPat, Hug, Kiss } from "./fun/LoveCommands";
import ChatDeadCmd from "./fun/ChatDead";
import { MemeCmd, NoContextCmd, PeopleCmd, PetCmd } from "../commands/fun/RandomImageCommands";
import { BugReport } from "./utils/bugReport";
import ChooseCmd from "./convenience/ChooseCmd";
import { SlashCommand } from "@kopymatic/basebot";
import FormatCmd from "./convenience/QuickFormatCommands";
import {
    addspaces,
    alphabetizer,
    buttonexample,
    clap,
    owo,
    randomcaps,
    reverser,
    say,
    scramble,
} from "./convenience/OldCommands";

export const kopyCommands: KopyCommand[] = [
    //fun
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
    //new PartnerCmd(), not finished
    new BugReport(),
];

export const slashCommands: SlashCommand[] = [
    new Hug(),
    new Kiss(),
    new Cuddle(),
    new HandHold(),
    new HeadPat(),
    new ChooseCmd(),
    new FormatCmd(),
    new LennyCmd(),
    new ChatDeadCmd(),
    new InsultSimulator(),
    new OneVOneCmd(),
    new About(),

    //Old commands - only here for deleting from discord
    new addspaces(),
    new alphabetizer(),
    new buttonexample(),
    new clap(),
    new owo(),
    new randomcaps(),
    new reverser(),
    new say(),
    new scramble(),
];
