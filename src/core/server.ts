import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser' 
import * as mongoose from 'mongoose'

import { isNumber, isString } from 'util';

import { mongoConfig } from './db'
import { JsonModelsToMongooseSchemas } from './schema'
import { NO_PORT, NOT_NUMERICAL_VALUE, SAME_PORT_DB_SERVER} from './errors'

/**
 * @class Server
 */
export class Server {
    /**
     * Represents express application of the server
     * @type {express.Application}
     * @memberof Server
     */
    private app: express.Application

    /**
     * Represents the port used for the server
     * @type {Number}
     * @memberof Server
     */
    private port: Number

    /**
     * Method which is able to run the server
     * @memberof Server
     */
    public async run() {
        this.app = express();
        this.middlewares();
        this.port = await this.getPort();

        const mongoURI = `mongodb://${mongoConfig.user}` + ( mongoConfig.pass ? ':' + mongoConfig.pass : '') + 
        `@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}` + 
        (mongoConfig.authMechanism ? '?authMechanism=' + mongoConfig.authMechanism : '');

        if(this.port !== undefined) {
            if(this.port !== mongoConfig.port) {
                mongoose.connect(mongoURI, { useNewUrlParser: true })
                    .then(() => {
                        this.app.listen(this.port, () => {
                            console.log(`The server is running on ${this.port}.\nThe database is running on ${mongoConfig.port}.`);
                            JsonModelsToMongooseSchemas(this.app);
                        })
                    })
                    .catch((err) => {
                        console.log('Impossible to connect to MongoDB:', err)
                    });
            }
            else {
                console.log(SAME_PORT_DB_SERVER);
            }
        }
        else {
            console.log(NOT_NUMERICAL_VALUE)
        }
    }

    /**
     * Méthode permettant d'utiliser les middlewares
     * @memberof Server
     * @returns {void}
     */
    private middlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    /**
     * Méthode permettant de récupérer le port renseigné dans le fichier de config
     * @memberof Server
     * @returns {Number}
     */
    private getPort(): Number {
        let p = path.join(__dirname, '../config/server-config.json');
        let PORT: Number;
        let json = JSON.parse(fs.readFileSync(p,'utf8'));
        let json_port = json.port;
        
        if(json_port !== null) {
            if(isNumber(json_port)) {
                PORT = json_port;
            }
            else if(isString(json_port)) {
                if(!isNaN(Number(json_port))) {
                    PORT = Number(json_port);
                }
            }
        }
        else {
            PORT= 3000;
            console.log(`${NO_PORT} ${PORT}`)
        }
        return PORT;
    }
}

