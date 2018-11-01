import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser' 

import { isNumber, isString } from 'util';

import { mongoConfig } from './db'
import { VALEUR_PAS_NUMERIQUE, PAS_DE_PORT, MEME_PORT_DB_SERVER } from './erreurs'

/**
 * @class Server
 */
export class Server {
    /**
     * Représente l'express application du serveur
     * @type {express.Application}
     * @memberof Server
     */
    private app: express.Application

    /**
     * Représente le port sur lequel le serveur va se lancer
     * @type {Number}
     * @memberof Server
     */
    private port: Number

    /**
     * Méthode permettant de lancer le serveur
     * @memberof Server
     */
    public async run() {
        this.app = express();
        this.middlewares();
        this.port = await this.recupererPort();
        if(this.port !== undefined) {
            if(this.port !== mongoConfig.port) {
                this.app.listen(this.port, () => {
                    console.log(`http://localhost:${this.port}`);
                    console.log(mongoConfig);
                })
            }
            else {
                console.log(MEME_PORT_DB_SERVER);
            }
        }
        else {
            console.log(VALEUR_PAS_NUMERIQUE)
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
    private recupererPort(): Number {
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
            console.log(`${PAS_DE_PORT} ${PORT}`)
        }
        return PORT;
    }
}

