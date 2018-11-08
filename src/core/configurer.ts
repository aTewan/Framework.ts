import * as commander from 'commander'
import * as fs from 'fs'
import * as inquirer from '@types/inquirer'
import * as util from 'util'

import { Server } from './server'
import { mongoConfig } from './db'

/**
 * @class Configurer
 */
export class Configurer {
    /**
     * Représente le serveur et sa configuration actuelle
     * @type {Server}
     * @memberof Configurer
     */
    private server: Server

    /**
     * Représente la bd et sa configuration actuelle
     * @type {Object}
     * @memberof Configurer
     */
    private db: object

    /**
     * Constructeur
     * @memberof Configurer
     */
    constructor() {
        this.db = mongoConfig
        this.server = new Server();
    }

     /**
     * Méthode permettant de modifier les configs
     * @memberof Configurer
     * @returns {void}
     */
    public changeConf(): void {
        console.log("Voici votre configuration actuelle : \n\n Database : \n\n" + util.inspect(this.db, false, null, true) + "\n\n Server : \n\n" + util.inspect(this.server, false, null, true))

        let questions:any = [
            {
              type: 'confirm',
              name: 'conf_actuelle',
              message: "Voulez-vous en changer ?"
            }];


          inquirer
            .prompt(questions)
            .then((answers) => {
                console.log(answers)                
            })
    }
}


commander
    .command('config')
    .action(function(port) {
        let conf: string = '{\n\t\"port\": '+port+'\n}'
        fs.writeFile('../config/server-config.json', conf, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });        
    })

commander.parse(process.argv)    