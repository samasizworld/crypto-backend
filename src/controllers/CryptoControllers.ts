import { createDbContext } from "../connection/connection";
import { CryptoMapper } from "../mapper/CryptoMapper";
import { CryptoService } from "../services/CryptoService";

export class CryptoControllers {
    async getCryptoCurrencies(req: any, res: any) {
        try {
            const dbContext = createDbContext();
            const cryptoService = new CryptoService(dbContext);
            const pageSize: number = req.query.pageSize ? parseInt(req.query.pageSize) : 20;
            const page: number = req.query.page ? parseInt(req.query.page) : 1;
            const offset: number = pageSize * (page - 1);
            const orderBy: string = req.query.orderBy ? req.query.orderBy : 'rank';
            const orderDir: string = req.query.orderDir ? req.query.orderDir : 'asc';
            const search = req.query.search || '';

            const { count, data } = await cryptoService.getCryptoCurrencies(search, offset, pageSize, orderDir, orderBy);
            const dto = new CryptoMapper().listMapper(data);
            res.header('x-count', count || 0)
            return res.status(200).send(dto);

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server Error' });

        }
    }
   
}