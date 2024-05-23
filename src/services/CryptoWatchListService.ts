import { CryptoWatchList } from "../model/cryptowatchlist";

export class CryptoWatchlistService {
    private dbContext: any;
    constructor(context: any) {
        const crypto = new CryptoWatchList().cryptoWatchListModel(context)
        this.dbContext = crypto
    }
    async addWatchList(model: any) {
        const exists = await this.dbContext.findOne({ where: { datedeleted: null, cryptoid: model.cryptoid } });
        if (exists) {
            await this.dbContext.update(model, { where: { datedeleted: null, cryptoid: model.cryptoid } });
        } else {
            await this.dbContext.create(model);
        }
    }

    async deleteWatchList(watchlistid: string) {
        await this.dbContext.update({ datedeleted: new Date() }, { where: { datedeleted: null, guid: watchlistid } });
    }

    async getCryptoWatchList() {
        return await this.dbContext.findAll({ where: { datedeleted: null } });
    }

}