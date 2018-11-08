import * as fs from 'fs'
import { objects } from 'inquirer';
import { type } from 'os';

/**
 * Méthode qui genere le modele utilisé dans swagger.json pour une route établie dans 'models'
 * @param routeName Nom de la route qui appelé
 * @returns Retourne un objet utilisé dans swagger.json
 */
export function generateSwaggerModel(routeName: string): Object{
    const tag = routeName.charAt(0).toUpperCase() + routeName.slice(1)
    return {
        "post": {
            "tags": [
                tag
            ],
            "description": `Create new ${routeName} in database`,
            "parameters": [
            {
                "name": routeName,
                "in": "body",
                "description": `${tag} that we want to create`,
                "schema": {
                "$ref": `#/definitions/${tag}`
                }
            }
            ],
            "produces": [
                "application/json"
            ],
            "responses": {
            "200": {
                "description": `New ${routeName} is created`,
                "schema": {
                    "$ref": `#/definitions/${tag}`
                }
            }
            }
        },
        "get": {
            "tags": [
                `${tag}s`
            ],
            "summary": `Get all ${routeName}s in system`,
            "responses": {
                "200": {
                    "description": "OK",
                    "schema": {
                        "$ref": `#/definitions/${tag}s`
                    }
                }
            }
        }
    }
};

// export function generateSwaggerParams(pathModel: string, routeName: string): any {
//     let params : { [key:string]: any } = {};
//     // console.log(pathModel, routeName);
//     return fs.readFile(pathModel, 'utf8', (err, data) => {
//         if(err) {
//             console.log(err)
//         }
//         else {
//             let content = JSON.parse(data)
            
//             // console.log(content)
//             Object.keys(content).forEach((param) => {
//                 params[param] = {
//                     param: {
//                         "type": "string",
//                     },
//                 };
//             })
//         }
//         console.log(params)
//         return params
//     })

// }