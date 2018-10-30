import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { isNumber, isString } from 'util';

import { VALEUR_PAS_NUMERIQUE, PAS_DE_PORT } from './erreurs'


export class Server {

    public app: express.Application

    public port: Number

    public async run() {
        this.app = express();
        this.port = await this.recupererPort();
        if(this.port !== undefined) {
            this.app.listen(this.port, () => {
                console.log(`http://localhost:${this.port}`);
            })
        }
        else {
            console.log(VALEUR_PAS_NUMERIQUE)
        }
    }

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

