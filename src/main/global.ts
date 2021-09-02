import { CommandClient } from "eris";
import config from "../resources/config.json"

export module global {
    export var experimental = config.experimental;
    export var version = config.version;
    export var name: string;
    export var prefix: string;
    export var token: string;
    if (experimental) { //There is probably a much better way to do this.s
        name = config.devBot.name;
        prefix = config.devBot.prefix;
        token = config.devBot.token;
    } else {
        name = config.mainBot.name;
        prefix = config.mainBot.prefix;
        token = config.mainBot.token;
    }
    export var bot: CommandClient;
}