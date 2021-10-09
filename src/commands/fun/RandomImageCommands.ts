import { Embed, Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import {global} from "../../main/global"
import { Memes, NoContext, People, Pets } from "../../main/models"
import { ButtonPaginator } from "../../utilities/ButtonPaginator";
import { randomInt } from "crypto";
import { Op } from "sequelize";

class RandomImageCommands extends KopyCommand {
    /**
    * The name of the database table to store this command's info inside of - this MUST BE SET
    */
    protected model: typeof NoContext | typeof People | typeof Pets | typeof Memes = null;

    /**
     * The footers this command can show - this MUST BE SET
     */
    protected footers = ["default"];

    private msg: Message<TextableChannel>;
    private args: string[];

    override async run(msg: Message<TextableChannel>, args: string[]): Promise<string> {
        this.msg = msg;
        this.args = args;
        if(msg.attachments.length > 0) {
            this.import()
        } else if (args.length == 0) {
            this.sendRandom()
        } else {
            switch (args[0].toLowerCase()) {
                case "delete": {
                    this.delete();
                    break;
                }
                case "edit": {
                    this.edit()
                    break;
                }
                case "all": {
                    this.sendAll()
                    break;
                }
                case "help": {
                    this.sendHelp();
                    break;
                }
                default: {
                    this.search()
                    break;
                }
            }
        }
        return null
    }

    protected async sendRandom() : Promise<void> {
        const all = await this.model.findAll({ //Using findall here is... not a good idea. If we ever get to a larger scale, this will be a problem.
            where: {
                guildid: this.msg.guildID //TODO add partnering
            }
        });
        if(all.length == 0) {
            global.bot.createMessage(this.msg.channel.id, {content: "It doesnt look like there are any entries in this guild or partnered guilds!"})
            return
        }
        const embed = this.makeEmbed(all[randomInt(all.length)])

        global.bot.createMessage(this.msg.channel.id, {embeds: [embed]});
        return;
    }

    protected async sendAll() : Promise<void> {
        const all = await this.model.findAll({
            where: {
                guildid: this.msg.guildID //TODO add partnering
            }
        });
        const embeds = new Array<Embed>()
        for(const item of all) {
            embeds.push(this.makeEmbed(item))
        }

        const message = await global.bot.createMessage(this.msg.channel.id, {content:"Loading..."});
        new ButtonPaginator(global.bot, message,
        {
            startingPage: 0,
            allowedUsers: [this.msg.author.id],
            maxTime: 30000,
            pages: embeds
        })
        return;
    }
    protected async edit() : Promise<void> {
        const toSearch = this.args[1];
        const parsed = parseInt(toSearch)
        if(!isNaN(parsed)) {
            const toEdit = await this.model.findOne({where: {id: parsed}});
            if(toEdit == null) {
                global.bot.createMessage(this.msg.channel.id, {
                    content: `Error: ID #${parsed} was not found in the database!`
                })
            }
            if(this.msg.guildID == toEdit.guildid) {
                if (/*this.msg.member.permissions.has("administrator")||*/ this.msg.author.id == toEdit.importerid) {
                    const id = toEdit.id
                    this.args.reverse().pop();
                    this.args.pop(); //Pointlessly convoluted shit to remove the first 2 elements
                    const newText = this.args.reverse().join(" ")
                    toEdit.texttag = newText;
                    await toEdit.save();
                    global.bot.createMessage(this.msg.channel.id, {
                        content: `Successfully edited ID #${id}! New text: "${newText}"`
                    })
                } else {
                    global.bot.createMessage(this.msg.channel.id, {
                        content: `Error: Insufficient permissions! You must be the original importer.`
                    })
                }
            } else {
                global.bot.createMessage(this.msg.channel.id, {
                    content: `Error: You cant edit entries from other guilds!`
                })
            }
        } else {
            global.bot.createMessage(this.msg.channel.id, {
                content: `Error: ID #${toSearch} is invalid! Must be an integer!`
            })
        }
    }

    protected async import() : Promise<void> {
        for(const attachment of this.msg.attachments) {
            const newRow = await this.model.create({
                guildid: this.msg.guildID,
                imagelink: attachment.url,
                linktag: null, //TODO make a regex that recognizes discord links
                texttag: this.args.join(" "),
                importerid: this.msg.author.id,
                importmessageid: this.msg.id
            })
            global.bot.createMessage(this.msg.channel.id, {
                content: "Your entry was imported! It has the id #" + newRow.id
            })
        }
    }

    protected async delete() : Promise<void> {
        const toSearch = this.args[1];
        const parsed = parseInt(toSearch)
        if(!isNaN(parsed)) {
            const toDelete = await this.model.findOne({where: {id: parsed}});
            if(toDelete == null) {
                global.bot.createMessage(this.msg.channel.id, {
                    content: `Error: ID #${parsed} was not found in the database!`
                })
            }
            if(this.msg.guildID == toDelete.guildid) {
                if (/*this.msg.member.permissions.has("administrator")|| - Causes error, fix later*/ this.msg.author.id == toDelete.importerid) {
                    const id = toDelete.id
                    toDelete.destroy();
                    global.bot.createMessage(this.msg.channel.id, {
                        content: `Successfully deleted ID #${id}`
                    })
                } else {
                    global.bot.createMessage(this.msg.channel.id, {
                        content: `Error: Insufficient permissions! You must be the original importer.`
                    })
                }
            } else {
                global.bot.createMessage(this.msg.channel.id, {
                    content: `Error: You cant delete entries from other guilds!`
                })
            }
        } else {
            global.bot.createMessage(this.msg.channel.id, {
                content: `Error: ID ${toSearch} is invalid! Must be an integer!`
            })
        }
    }

    protected async search() : Promise<void> {
        const toSearch = this.args.join(" ");
        const parsed = parseInt(toSearch)
        if(isNaN(parsed)) {
            const all = await this.model.findAll({
                where: {
                    guildid: this.msg.guildID, //TODO add partnering
                    texttag: {[Op.iLike]: `%${toSearch}%`}
                },
            });

            if(all.length == 0) {
                global.bot.createMessage(this.msg.channel.id, {content: "It doesnt look like that search term is in this guild or any partnered guilds!"})
                return
            }

            const embeds = new Array<Embed>()
            for(const item of all) {
                embeds.push(this.makeEmbed(item))
            }

            const message = await global.bot.createMessage(this.msg.channel.id, {content:"Loading..."});
            new ButtonPaginator(global.bot, message,
            {
                startingPage: 0,
                allowedUsers: [this.msg.author.id],
                maxTime: 30000,
                pages: embeds
            })
            return
        } else {
            const result = await this.model.findOne({
                where: {
                    guildid: this.msg.guildID, //TODO add partnering
                    id: parsed
                }
            });

            if(result == null) {
                global.bot.createMessage(this.msg.channel.id, {content: "It doesnt look like that ID is in this guild or any partnered guilds!"})
                return
            } else {
                const embed = this.makeEmbed(result)
                global.bot.createMessage(this.msg.channel.id, {embeds: [embed]});
            }
        }
    }

    sendHelp() {
        global.bot.createMessage(this.msg.channel.id, {
            embeds: [{
                title: `How to use ${this.label}:`,
                description: `${this.label} is a simple command with many complex operations you can do. Here's an explanation.`,
                fields: [
                    {
                        name: `Getting a random ${this.label} entry:`,
                        value: `This is as simple as running the command with no arguments`
                    },
                    {
                        name: `Getting a specific ${this.label} entry:`,
                        value: `Run the command with a search or an entry id to get a specific entry. \n**Examples:** \`${global.prefix}${this.label} (search term)\` or \`${global.prefix}${this.label} (entry id)\``
                    },
                    {
                        name: `Importing:`,
                        value: `To import an image to the database, send the command with an attachment. Optionally, you can supply a description. Videos are **not** currently supported.`
                    },
                    {
                        name: `Editing:`,
                        value:  "If you ever wish to edit the text of something you previously imported, " +
                            "send the command the same as you would with importing, but with edit and an id at the beginning and no attachment" +
                            `\n**Example:** \`${global.prefix}${this.label} edit (entry ID) (new text here)\`` +
                            "\n**Note:** Editing an import that has a link with no link will delete that link."
                    },
                    {
                        name: `Deleting:`,
                        value:  "If you wish to delete something you imported, just run the command with delete and an id" +
                            `\n**Example**: \`${global.prefix}${this.label} delete (entry ID)\``,
                    }
                ]
            }]
        })
    }

    private makeEmbed(item: NoContext | People | Pets | Memes) : Embed {
        let linkTag;
        if (item.linktag == null || item.linktag.match(/null/i)) {
            linkTag = null;
        }
        return {
            title: `${this.label} #${item.id}`,
            url: linkTag,
            description: item.texttag,
            image: {url: item.imagelink},
            footer: {text: this.footers[0]}, //TODO Randomize footers
            color: global.defaultColor,
            type: "rich",

        }
    }
}

export class NoContextCmd extends RandomImageCommands {
    constructor() {
        super()
        this.label = "NoContext";
        this.options = {
            aliases: ["nc"],
            description: "Displays a random no context image", 
            usage: `Do ${global.prefix}${this.label} help for advanced help`,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args)
        this.model = NoContext
        this.footers = ["Laugh. Now.", "laugh! >:(", "nice meme, very poggers"]

    }
}

export class PeopleCmd extends RandomImageCommands {
    constructor() {
        super()
        this.label = "People";
        this.options = {
            aliases: ["ppl", "me"],
            description: "Shows a random person that was imported to the database", 
            usage: `Do ${global.prefix}${this.label} help for advanced help`,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args)
        this.model = People
        this.footers = ["Oh this- this is beautiful", "Looking fabulous!", "that's a cute ass person ya got there"]

    }
}

export class PetCmd extends RandomImageCommands {
    constructor() {
        super()
        this.label = "Pet";
        this.options = {
            aliases: ["dog", "cat"],
            description: "Shows a random pet that was imported to the database", 
            usage: `Do ${global.prefix}${this.label} help for advanced help`,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args)
        this.model = Pets
        this.footers = ["Oh this- this is beautiful", "Looking fabulous!", "aww cute pet", "that's a cute ass pet ya got there"]

    }
}

export class MemeCmd extends RandomImageCommands {
    constructor() {
        super()
        this.label = "Meme";
        this.options = {
            description: "Shows a random meme that was imported to the database", 
            usage: `Do ${global.prefix}${this.label} help for advanced help`,
            caseInsensitive: true,
        };
        this.generator = (msg, args) => this.run(msg, args)
        this.model = Memes
        this.footers = ["haha funny", "nice meme, very poggers", "laugh! >:("]

    }
}