import { Sequelize } from "sequelize";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
});


export const connect = async () => {
    try {
        await db.authenticate();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export const syncModel = async()=>{
    db.sync().then(() => console.log("Table created successfully")).catch((error) => console.log(error));
}

export default db;