export class CryptoMapper {
    modelMapper(data: any) {
        return data.map((d: any) => {
            return {
                name: d.name,
                code: this.changeCode(d.code),
                img: d.img,
                twentyfourhour: parseFloat(d["24h"]),
                marketcap: this.convertMarketCap(d.marketcap),
                price: this.convertPrice(d.price)
            }
        })
    }
    listMapper(data: any) {
        return data.map((d: any) => {
            return {
                CryptoId: d.guid,
                CryptoName: d.name,
                Code: d.code,
                Image: d.img,
                Change_24h: d.twentyfourhour,
                MarketCap: d.marketcap,
                Price: d.price,
                DateModified: d.datemodified
            }
        })
    }
    convertMarketCap(mc: string) {
        const num = mc.match(/[0-9.]+/);
        if (mc.includes('trillion')) {
            return num ? parseFloat(num[0]) * 1000000000000 : 0
        } else if (mc.includes('billion')) {
            return num ? parseFloat(num[0]) * 1000000000 : 0
        } else {
            return 0
        }
    }
    convertPrice(price: string) {
        const num = price.replace(/[,]+/, '').match(/[0-9.]+/);
        return num ? parseFloat(num[0]) : 0
    }
    changeCode(code: string) {
        if (code.includes('Top gainer')) {
            return code.replace('Top gainer', '').trim()
        } else if (code.includes('Top loser')) {
            return code.replace('Top loser', '').trim()
        }
        else {
            return code;
        }
    }
}