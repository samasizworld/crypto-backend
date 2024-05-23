import { DataTypes } from "sequelize";

export class Crypto {
    cryptoModel(context: any) {
        return this.Crypto(context).schema("public");
    }
    private Crypto(context: any) {
        return context.define(
            "crypto",
            {
                cryptoid: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                guid: { type: DataTypes.UUID },
                name: { type: DataTypes.STRING },
                code: { type: DataTypes.STRING },
                img: { type: DataTypes.STRING },
                price: { type: DataTypes.STRING },
                marketcap: { type: DataTypes.STRING },
                twentyfourhour: { type: DataTypes.STRING },
                rank: { type: DataTypes.INTEGER },
                datecreated: { type: "TIMESTAMP" },
                datemodified: { type: "TIMESTAMP" },
                datedeleted: { type: "TIMESTAMP" },
            },
            { timestamps: false, tableName: "crypto" }
        );
    }
}
