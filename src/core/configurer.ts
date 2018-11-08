import * as commander from 'commander'
import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as util from 'util'
import * as path from 'path'

import { Server } from './server'
import { mongoConfig } from './db'

interface MyAnswers {
    init_conf: boolean
    target_conf: string
    port: string
}

/**
 * @class Configurer
 */
export class Configurer {
    /**
     *The server and its configuration
     * @type {Server}
     * @memberof Configurer
     */
    private server: Server

    /**
     * The database and its configuration
     * @type {Object}
     * @memberof Configurer
     */
    private db: object

    /**
     * Constructor
     * @memberof Configurer
     */
    constructor() {
        this.db = mongoConfig
        this.server = new Server()
    }

    /**
     * Method which allow you to modify server configuration
     * @memberof Configurer
     * @returns {void}
     */
    private async change_server_conf(): Promise<void> {
        let question: inquirer.Questions<MyAnswers> = [
            {
                type: 'input',
                name: 'port',
                message: 'On which port do you want to move the server ?',
            }]
        let answers = await inquirer.prompt<MyAnswers>(question)
        let conf: string = '{\n\t\"port\": '+answers.port+'\n}'    
        fs.writeFile(path.join(__dirname, '../config/server-config.json'), conf, (err) => {
            if (err) throw err;
          });        
    }

    /**
     * Method which allow you to modify database configuration
     * @memberof Configurer
     * @returns {void}
     */
    private async change_db_conf(): Promise<void> {
        
    }

     /**
     *  Method which allow user to modify configurations
     * @memberof Configurer
     * @returns {void}
     */
    public async menuConf(): Promise<void> {
        console.log("This is your configuration : \n\n Database : \n\n" + util.inspect(this.db, false, null, true) + "\n\n Server : \n\n" + util.inspect(this.server, false, null, true))

        let questions: inquirer.Questions<MyAnswers> = [
            {
                type: 'confirm',
                name: 'init_conf',
                message: 'Do you want to change this ?',
            },
            {
                type: 'list',
                name: 'target_conf',
                message: 'Change server, database or both configurations ?',
                choices: ['Server', 'Database', 'Both']
            }
        ];

        let answers = await inquirer.prompt<MyAnswers>(questions[0])
        if (answers.init_conf) {
            answers = await inquirer.prompt<MyAnswers>(questions[1])
            switch (answers.target_conf){
                case 'Server':{
                    await this.change_server_conf().then(() => {
                        console.log("Server configuration update completed!")
                    }).catch((err) => {
                        console.log(err)
                    })
                    break;
                }
                case 'Database':{
                    await this.change_db_conf().then(() => {
                        console.log("Database configuration update completed!")
                    }).catch((err) => {
                        console.log(err)
                    })
                    break;
                }
                default:
                {
                    await this.change_server_conf().catch((err) => {
                        console.log(err)
                    })
                    await this.change_db_conf().catch((err) => {
                        console.log(err)
                    })
                    console.log('Updates completed!')
                    break;
                }
            }
        }
        
    }
}   