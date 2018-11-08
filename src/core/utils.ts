import * as fs from 'fs'
import * as path from 'path'


/**
 * Méthode permettant de savoir si un dossier est vide ou pas
 * @param chemin 
 * @returns booléen
 */
export function isDossierVide(chemin: string): Promise<boolean> {
    let p = path.join(`${__dirname}/${chemin}`)
    return new Promise((resolve, reject) => {
        fs.readdir(p, (err, files) => {
            if(err) return reject(err)
            resolve(!files)
        })
    })
}