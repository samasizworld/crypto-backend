import { Op, Sequelize } from "sequelize";
import { Crypto } from "../model/crypto";

export class CryptoService {
    private dbContext: any;
    constructor(context: any) {
        const crypto = new Crypto().cryptoModel(context)
        this.dbContext = crypto
    }
    async upsertCrypto(cryptoModel: any) {
        for (const model of cryptoModel) {
            try {
                const isExistByCodeName = await this.dbContext.findOne({ where: { code: model.code, datedeleted: null } });
                if (!isExistByCodeName) {
                    await this.dbContext.create(model)
                } else {
                    await this.dbContext.update(model, { where: { code: model.code, datedeleted: null } })
                }
            } catch (error) {
                console.log(error.sql)
                continue;
            }

        }
    }
    
    async getCryptoByCode(code: string) {
        return await this.dbContext.findOne({ where: { code: code, datedeleted: null } });
    }

    async getCryptoCurrencies(search: string, offset: number, pageSize: number, orderDir: string, orderBy: string) {
        let result: any = {};
        let whereQuery: any = { datedeleted: null };
        if (search) {
            whereQuery = {
                ...whereQuery,
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { code: { [Op.iLike]: `%${search}%` } }
                ]
            }
        }
        if (pageSize == 0) {
            result.data = await this.dbContext.findAll({ where: whereQuery })

        } else {
            result.data = await this.dbContext.findAll({
                where: whereQuery, order: [[Sequelize.fn('lower', Sequelize.col(orderBy)), orderDir]], limit: pageSize, offset: offset
            })

        }
        result.count = await this.dbContext.count({ where: whereQuery });
        return result;
    }
}