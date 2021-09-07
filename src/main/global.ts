import { CommandClient } from "eris";
import config from "../resources/config.json"

export module global {
    export var experimental = config.experimental;
    export var version = config.version;
    export var name: string;
    export var prefix: string;
    export var token: string;
    export var defaultColor = 0xFF6FFF //I would load these from config.json but then id have to parse and ehhhhhh
    export var red = 0xED4245
    export var green = 0x57F287
    if (experimental) { //There is probably a much better way to do this
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