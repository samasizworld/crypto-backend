import { createDbContext } from "../connection/connection";
import { Logger } from "../logger/logger";
import { CryptoWatchListMapper } from "../mapper/CryptoWatchListMapper";
import { CryptoService } from "../services/CryptoService";
import { CryptoWatchlistService } from "../services/CryptoWatchListService";

export class CryptoWatchlistControllers {
    async getWatchList(req: any, res: any) {
        try {
            const dbContext = createDbContext();
            const cryptoService = new CryptoService(dbContext);
            const cryptoWatchListService = new CryptoWatchlistService(dbContext);
            const watchlistMapper = new CryptoWatchListMapper();
            const watchlist = await cryptoWatchListService.getCryptoWatchList();
            const { data } = await cryptoService.getCryptoCurrencies('', 0, 0, '', '');
            const dtos = watchlistMapper.dtoWatchListMapper(watchlist, data)
            return res.status(200).send(dtos)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server Error' });
        }
    }

    async addWatchList(req: any, res: any) {
        try {
            const dbContext = createDbContext();
            const watchlistBody = req.body;
            const cryptoService = new CryptoService(dbContext);
            const cryptoWatchListService = new CryptoWatchlistService(dbContext);
            const watchlistMapper = new CryptoWatchListMapper();
            const logger = new Logger();
            const crypto = await cryptoService.getCryptoByCode(watchlistBody.Code);
            if (!crypto) {
                return res.status(404).send({ message: "Crypto code not found" });
            }
            const price = parseFloat(crypto.price);
            const model = await watchlistMapper.addWatchList(watchlistBody, crypto);
            if (price <= watchlistBody.MinPrice || price >= watchlistBody.MaxPrice) {
                await logger.notificationLogger(watchlistBody.Code, crypto.twentyfourhour, price, watchlistBody.MinPrice, watchlistBody.MaxPrice);
            }
            await cryptoWatchListService.addWatchList(model);
            return res.status(201).send({ message: 'Added to Watchlist' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server Error' });
        }
    }

    async deleteWatchList(req: any, res: any) {
        try {
            const dbContext = createDbContext();
            const watchlistId = req.params.cryptowatchlistid;
            const cryptoWatchListService = new CryptoWatchlistService(dbContext);
            await cryptoWatchListService.deleteWatchList(watchlistId)
            return res.status(204).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server Error' });
        }
    }

}