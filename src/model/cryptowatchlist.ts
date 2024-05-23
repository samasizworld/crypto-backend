import { DataTypes } from "sequelize";

export class CryptoWatchList {
    cryptoWatchListModel(context: any) {
        return this.CryptoWatchList(context).schema("public");
    }
    private CryptoWatchList(context: any) {
        return context.define(
            "cryptowatchlist",
            {
                cryptowatchlistid: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                guid: { type: DataTypes.UUID },
                cryptoid: { type: DataTypes.INTEGER },
                userid: { type: DataTypes.INTEGER },
                maxprice: { type: "NUMERIC" },
                minprice: { type: "NUMERIC" },
                datecreated: { type: "TIMESTAMP" },
                datemodified: { type: "TIMESTAMP" },
                datedeleted: { type: "TIMESTAMP" },
            },
            { timestamps: false, tableName: "cryptowatchlist" }
        );
    }
}
