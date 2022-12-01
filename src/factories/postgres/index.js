import _ from "lodash";
import Sequelize from "sequelize";
import userModel from "./models/user";

const onModelImport = async (models, db) => {
    await models.map((item) => {
        try {
            item.model(db, Sequelize.DataTypes);
        } catch (error) {
            console.log(`Error importing model ${item.name} :` + error);
        } finally {
            console.log(`Imported model ${item.name}`);
        }
    });
};

export default async () => {
    let database, models;

    database = new Sequelize(
        process.env.PG_DB_NAME,
        process.env.PG_DB_USER,
        process.env.PG_DB_PASSWORD,
        {
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            dialect: "postgres",
        }
    );

    try {
        await database.authenticate();
        console.log(`Connected to ${process.env.PG_NAME} `);
    } catch (error) {
        console.error(
            `Unable to connect to ${process.env.PG_NAME}:`,
            error
        );
    }

    (models = [
        {
            name: "users",
            model: userModel,
        },
    ]),

    await onModelImport(models, database);

    await database.sync({
        force: true,
    });

    return database;
};
