import { Sequelize } from "sequelize";


let sequelize: any;
export const sequelizeConnect = () => {
    sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        pool: {
            max: 25,
            min: 0,
            idle: 3000,
            acquire: 100000,
        },
        logging: true,
    });
};

export const createDbContext = () => {
    return sequelize;
};
