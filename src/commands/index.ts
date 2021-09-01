import { KopyCommand } from "../main/KopyCommand";
import { Eval } from "./EvalCmd";
import { OneVOne } from "./OneVOneCmd";
import { Ping, Pong } from "./PingCmd";

const commands: KopyCommand[] = [
    new OneVOne(),
    new Ping(),
    new Pong(),
    new Eval(),
];

export default commands;