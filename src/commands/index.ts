import KopyCommand from "../utilities/KopyCommand";
import { About } from "./utils/About";
import { OneVOneCmd } from "./fun/OneVOne";
import { LennyCmd } from "./convenience/QuickStringCommands";
import InsultSimulator from "./fun/InsultSimulator";
import { Cuddle, HandHold, HeadPat, Hug, Kiss } from "./fun/LoveCommands";
import ChatDeadCmd from "./fun/ChatDead";
import { MemeCmd, NoContextCmd, PeopleCmd, PetCmd } from "../commands/fun/RandomImageCommands";
import { BugReport } from "./utils/bugReport";
import ChooseCmd from "./convenience/ChooseCmd";
import { SlashCommand } from "@kopymatic/basebot";
import FormatCmd from "./convenience/QuickFormatCommands";
import PollCmd from "./utils/Poll";
import NoContextSlaCmd from "./fun/NoContext";

export const kopyCommands: KopyCommand[] = [
    //fun
    new NoContextCmd(),
    new PeopleCmd(),
    new PetCmd(),
    new MemeCmd(),

    //new PartnerCmd(), not finished
    new BugReport(),
];

export const slashCommands: SlashCommand[] = [
    new NoContextSlaCmd(),
    new PollCmd(),
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
];
