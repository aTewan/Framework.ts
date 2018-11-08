import * as fs from 'fs'
import * as path from 'path'


/**
 * Method which checks if a folder is empty or not
 * @param _path 
 * @returns boolean
 */
export function isFolderEmpty(_path: string): Promise<boolean> {
    let p = path.join(`${__dirname}/${_path}`)
    return new Promise((resolve, reject) => {
        fs.readdir(p, (err, files) => {
            if(err) return reject(err)
            resolve(!files)
        })
    })
}