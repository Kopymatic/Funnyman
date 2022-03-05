import { DataTypes, Model, Sequelize } from "sequelize";
import global from "./global";

const database = (global.database = new Sequelize(
    `postgres://${global.databaseUsername}:${global.databasePassword}@localhost:5432/KotBot`,
    { logging: false }
));
global.database = database;

export class LoveCommand extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    senderid: string;
    receiverid: string;
    actionidentifier: string;
    timesperformed: number;
}

LoveCommand.init(
    {
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
    },
    { sequelize: database, tableName: "lovecommands", timestamps: false }
);

LoveCommand.sync().then(
    () => console.log("LoveCommand model success!"),
    (err) => console.error("LoveCommand model error!", err)
);

export class NoContext extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    id: number;
    guildid: string;
    imagelink: string;
    linktag: string;
    texttag: string;
    importerid: string;
    importmessageid: string;
}

NoContext.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        guildid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagelink: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        linktag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        texttag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        importerid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        importmessageid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize: database, tableName: "nocontext", timestamps: false }
);

NoContext.sync().then(
    () => console.log("NoContext model success!"),
    (err) => console.error("NoContext model error!", err)
);

export class People extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    id: number;
    guildid: string;
    imagelink: string;
    linktag: string;
    texttag: string;
    importerid: string;
    importmessageid: string;
}

People.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        guildid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagelink: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        linktag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        texttag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        importerid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        importmessageid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize: database, tableName: "people", timestamps: false }
);

People.sync().then(
    () => console.log("People model success!"),
    (err) => console.error("People model error!", err)
);

export class Pets extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    id: number;
    guildid: string;
    imagelink: string;
    linktag: string;
    texttag: string;
    importerid: string;
    importmessageid: string;
}

Pets.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        guildid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagelink: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        linktag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        texttag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        importerid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        importmessageid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize: database, tableName: "pets", timestamps: false }
);

Pets.sync().then(
    () => console.log("Pets model success!"),
    (err) => console.error("Pets model error!", err)
);

export class Memes extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    id: number;
    guildid: string;
    imagelink: string;
    linktag: string;
    texttag: string;
    importerid: string;
    importmessageid: string;
}

Memes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        guildid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagelink: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        linktag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        texttag: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        importerid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        importmessageid: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize: database, tableName: "memes", timestamps: false }
);

Memes.sync().then(
    () => console.log("Memes model success!"),
    (err) => console.error("Memes model error!", err)
);

export class Partner extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    serverID: string;
    partners: Array<string>;
}

Partner.init(
    {
        serverID: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        partners: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    { sequelize: database, timestamps: true }
);

Partner.sync().then(
    () => console.log("Partner model success!"),
    (err) => console.error("Partner model error!", err)
);

export class Bug extends Model {
    // Specifying data types on the class itself so the compiler doesnt complain
    id: number;
    messageID: string;
}

Bug.init(
    {
        messageID: {
            type: DataTypes.TEXT,
        },
    },
    { sequelize: database, timestamps: true }
);

Bug.sync().then(
    () => console.log("Bug model success!"),
    (err) => console.error("Bug model error!", err)
);
