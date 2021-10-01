import { DataTypes, Model, Sequelize } from "sequelize";
import { global } from "../main/global"

var database = global.database = new Sequelize(`postgres://${global.databaseUsername}:${global.databasePassword}@localhost:5432/KotBot`, {logging: false});
global.database = database

export class LoveCommand extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    senderid: string;
    receiverid: string;
    actionidentifier: string;
    timesperformed: number;
}

LoveCommand.init({
    senderid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      receiverid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      actionidentifier: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timesperformed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}, { sequelize: database, tableName: "lovecommands", timestamps: false,  });

LoveCommand.sync().then(() => console.log("LoveCommand model success!"), err => console.error("LoveCommand model error!", err))