import { sequelizeConnect } from './connection/connection';
import { fork } from 'child_process';
import cron from 'node-cron';
import { setEnv } from './appConfig'
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import featurePolicy from 'feature-policy';
import cors from 'cors';
import { CryptoControllers } from './controllers/CryptoControllers';
import { CryptoWatchlistControllers } from './controllers/CryptoWatchlistControllers';

// Initialize Db Connection and Environment Variables
setEnv();
sequelizeConnect();


// define Express App Server
const app = express();

// define route object
const router = express.Router();

// set json limit and urlencoded limit
app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({
  limit: "100mb",
  extended: true,
  parameterLimit: 100000
}));

//  set helmet
app.use(
  helmet({
    frameguard: {
      action: "sameorigin",
    },
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      },
    },
    hsts: {
      maxAge: 5184000,
    },
    referrerPolicy: {
      policy: "same-origin",
    },
  })
);
app.use(featurePolicy({

  features: {
    camera: ["'none'"],
    microphone: ["'none'"],
    geolocation: ["'none'"],
  },

}))

// set cors
app.use(cors({
  "origin": "*",
  "allowedHeaders": "*",
  "exposedHeaders":"*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}));


// route definition
router.get('/crypto', (req, res) => {
  new CryptoControllers().getCryptoCurrencies(req, res)
});

router.get('/watchlist', (req, res) => {
  new CryptoWatchlistControllers().getWatchList(req, res)
});
router.post('/watchlist', (req, res) => {
  new CryptoWatchlistControllers().addWatchList(req, res);
});
router.delete('/watchlist/:cryptowatchlistid', (req, res) => {
  new CryptoWatchlistControllers().deleteWatchList(req, res);
});
app.use('/', router);

// listening on port
app.listen(process.env.SERVER_PORT, () => { console.log(`Running on port ${process.env.SERVER_PORT}`) })

// hit on this middleware if no match route found
app.use((req, res, next) => {
  res.status(400).send({ message: "Node api Bad Request!!" });
});





// Function to start the child process
const startScraper = () => {
  const scrapperModule = path.resolve(__dirname, './module/scrapper')
  const child = fork(scrapperModule, [], {
    execArgv: ['-r', 'ts-node/register']
  });

  console.log(`Parent Process Id ${process.pid}`)

  child.on('exit', (code) => {
    console.log(`Child terminated with code ${code}`);
    child.kill();
  });
};

cron.schedule('*/5 * * * *', () => {
  console.log('Starting scraper process...');
  startScraper();
});




