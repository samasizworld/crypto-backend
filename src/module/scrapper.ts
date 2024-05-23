import { launch } from 'puppeteer';
import { CryptoMapper } from '../mapper/CryptoMapper';
import { createDbContext, sequelizeConnect } from '../connection/connection';
import { CryptoService } from '../services/CryptoService';

sequelizeConnect();
const scrapeData = async () => {
    console.log(`Child Process Id ${process.pid}`)
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://coinranking.com/');
    const results = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr'), (htmlElement) => {
            const columnTexts = htmlElement.innerText.split('\n');
            const obj: any = {}
            columnTexts.forEach((item, index) => {
                if (index == 0) {
                    obj['index'] = item.trim()
                } else if (index == 1) {
                    obj['name'] = item.trim()
                } else if (index == 2) {
                    obj['code'] = item.trim()
                } else if (index == 3) {
                    obj['price'] = item.trim()
                } else if (index == 4) {
                    obj['marketcap'] = item.trim()
                } else if (index == 5) {
                    obj['24h'] = item.trim()
                }
            })

            const img = htmlElement.querySelector('img') ? htmlElement.querySelector('img').src : null;
            return { ...obj, img };
        })
        return rows;
    });

    const cryptoCurrencies = results.filter(cc => cc.img != null).reduce((prev, curr) => {
        const exists = prev.find((p: any) => p.index == curr.index)
        if (!exists) {
            prev.push(curr)
        }
        return prev;
    }, []).filter((item: any) => {
        const index = parseInt(item.index, 10);
        return index >= 1 && index <= 50;
    })
    const dbContext = createDbContext()
    const cryptoMapper = new CryptoMapper();
    const cryptoService = new CryptoService(dbContext);
    const cryptoModel = cryptoMapper.modelMapper(cryptoCurrencies);
    await cryptoService.upsertCrypto(cryptoModel);
    await browser.close();
};

scrapeData().catch(console.error);
