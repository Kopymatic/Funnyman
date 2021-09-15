import { Message, TextableChannel } from "eris";
import { KopyCommand } from "../../utilities/KopyCommand";
import { global } from "../../main/global"
import { QueryTypes } from "sequelize/types";

abstract class LoveCommand extends KopyCommand{
    /**
     * Array of gifs the command can pick from
     */
    protected abstract gifs: string[];
    /**
     * The ActionIdentifier is 4 characters that will be used to identify this conmmand in the database
     */
    protected abstract actionIdentifier: string;
    /**
     * The title text used in the embed
     * Example:
     * "(user) (embedTitleText) (otheruser)"
     * "That's (number) (embedFooterText) now!"
     */
     protected abstract embedTitleText: string

     /**
      * The footer text used in the embed
      * Example:
      * "(user) (embedTitleText) (otheruser)"
      * "That's (number) (embedFooterText) now!"
      */
     protected abstract embedFooterText: string
 
     /**
      * When a command is issued, there's a percent chance that it will react with an emoji. This is where those emojis are stored.
      * Must be properly formatted. Ask Kopy. Defaults to a bunch of hearts.
      */
     protected possibleReactions = ["U+2764", "U+1F496", "U+1F497", "U+1F49F", "U+2763", "U+1F49D", "U+1F49E", "U+1F495", "U+1F493"]
 
     /**
      * The percentage chance of a reaction. Set to 0 to never have any, set to 100 to always have them.
      * Default of 33
      */
     protected reactionPercent = 33
 
     /**
      * Because funny secks number.
      */
     private sixtyNineGifs = ["https://media1.tenor.com/images/552432b67854256e7b51ab96c86d8b80/tenor.gif"]


     override async run(msg: Message<TextableChannel>, args: String[]): Promise<string> {
         if(msg.mentions.length > 0) {
             let userID = msg.author.id; // The user id duh
             let mentionID = msg.mentions[0].id; //The id of the first user mentioned
             
             //Here's where we do database shit. Oh boy.
            let [results, metadata] = await global.database.query(
                `SELECT * FROM LoveCommands WHERE SenderID = '${userID}' AND ReceiverID = '${mentionID}' AND ActionIdentifier = '${this.actionIdentifier}';`
                , {type:QueryTypes.SELECT, bi}); // Get all entries where the correct user id and mention id is used in LoveCommands
            
            let timesPerformed: number
            if (results[0] != null) { //If the first result exists
                timesPerformed = results[0];
            }
         }
         return null;
     }
}