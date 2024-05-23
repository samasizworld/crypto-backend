import moment from 'moment';
import fs, { createWriteStream } from 'fs';
export class Logger {
    async notificationLogger(code: string, change_24h: number, price: number,min:number,max:number) {
        let dirPath = '/logger/notificationlogs/';
        let filePath = dirPath + 'notification-logger-' + moment().format('YYYY-MM-DD') + '_logs.log';
        let content = '..................NotificationLogger.............................' + '\n'
            + `Date:${moment().format('YYYY-MM-DD HH:mm:ss')} => ${code} is on the move, the Price is ${change_24h <= 0 ? `down` : `up`} ${change_24h}% in 24 hrs to $${price}` + '\n\n\n';

        let filePathExists = fs.existsSync(dirPath);
        if (!filePathExists) {
            fs.mkdirSync(dirPath, { recursive: true });

        }
        let logStream = await createWriteStream(filePath, { flags: 'a' });
        logStream.write(content);
        logStream.end();

    }
}