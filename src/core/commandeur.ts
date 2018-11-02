import * as commander from 'commander'
import * as fs from 'fs'


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