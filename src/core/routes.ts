import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { isNumber, isString } from 'util';

type Route = {
    name: string,
    controller: string,
    route: string
}


/**
 * @class Server
 */
export class Routes {
    /**
     * Stock les routes
     * @type {Route[]}
     * @memberof Routes
     */
    private routes: Route[]

    /**
     * Méthode permettant de récupérer les routes renseignés dans le fichier de config
     * @memberof Routes
     * @returns Route[]
     */
    private getRoutes(): Route[] {
        let p = path.join(__dirname, '../config/routes-config.json');
        let json = JSON.parse(fs.readFileSync(p,'utf8'));

        if(json !== null) {
            json.forEach(function (route:Route) {
                this.routes.push(route);
            });
        }
        else {
            console.log(`UNABLE TO READ FILE`);
            return;
        }

        return this.routes;
    }

    /**
     * Méthode permettant de créer les routes
     * @memberof Routes
     * @returns void
     */
    private createRoutes(): void {

        this.routes.forEach(function(route){
            // Déclarer le route pour express
        })
        
    }
}

