import { Server } from './src/core/server'
import { Configurer } from './src/core/configurer'

let server = new Server();
let configurer = new Configurer();
configurer.changeConf();

server.run()