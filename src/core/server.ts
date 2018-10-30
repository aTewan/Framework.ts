import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { isNumber, isString } from 'util';


export class Server {

    public app: express.Application

    public port: Number

    public async run() {
        this.app = express();
        this.port = await this.recupererPort();
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        })
    }

    private recupererPort(): Number {
        let p = path.join(__dirname, '../config/server-config.json');
        let PORT: Number;
        let json = JSON.parse(fs.readFileSync(p,'utf8'));
        let json_port = json.port;
        
        if(json_port !== null) {
            if(isNumber(json_port)) {
                console.log(`Port NOMBRE : ${json_port}`)
                PORT = json_port;
            }
            else if(isString(json_port)) {
                if(isNaN(Number(json_port))) {
                    console.log(`Erreur : La valeur renseignée pour le port n'est pas une valeur numérique.`)
                }
                else {
                    console.log(`Port STRING : ${json_port}`)
                    PORT = Number(json_port);
                }
            }
        }
        else {
            PORT= 3000;
            console.log(`Erreur : Vous n'avez pas renseigné de valeur pour le port, le port par défaut, ${PORT}, est donc utilisé`)
        }
        /*
        fs.readFile(p,'utf8', (err,data) => {
            if(err) {
                console.log(`Erreur ${err}`)
            }
            else {
                let json: any = JSON.parse(data);
                let json_port: any = json.port;
                if(json_port !== null) {
                    if(isNumber(json_port)) {
                        console.log(`Port NOMBRE : ${json_port}`)
                        PORT = json_port;
                    }
                    else if(isString(json_port)) {
                        if(isNaN(Number(json_port))) {
                            console.log(`Erreur : La valeur renseignée pour le port n'est pas une valeur numérique.`)
                        }
                        else {
                            console.log(`Port STRING : ${json_port}`)
                            PORT = Number(json_port);
                        }
                    }
                }
                else {
                    PORT= 3000;
                    console.log(`Erreur : Vous n'avez pas renseigné de valeur pour le port, le port par défaut, ${PORT}, est donc utilisé`)
                }
            }
        });
        */
        return PORT;
    }
}

