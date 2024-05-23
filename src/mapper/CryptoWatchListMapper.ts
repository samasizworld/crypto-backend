export class CryptoWatchListMapper {
    dtoWatchListMapper(data: any, crypto: any) {
        return data.map((d: any) => {
            const cryptoRec = crypto.find((c: any) => c.cryptoid == d.cryptoid);
            return {
                CryptoWatchListId: d.guid,
                CryptoName: cryptoRec.name,
                Code: cryptoRec.code,
                Image: cryptoRec.img,
                Change_24h: cryptoRec.twentyfourhour,
                MarketCap: cryptoRec.marketcap,
                Price: cryptoRec.price,
                MaxPrice: d.maxprice,
                MinPrice: d.minprice,
                CryptoId: cryptoRec.guid
            }
        })
    }

    addWatchList(dto: any, crypto: any) {
        return {
            cryptoid: crypto.cryptoid,
            maxprice: dto.MaxPrice,
            minprice: dto.MinPrice
        }
    }

}