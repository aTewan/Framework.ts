const generateSchema = require('generate-schema')
import * as fs from 'fs'
import * as path from 'path'
import * as mongoose from 'mongoose'
import * as express from 'express'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

import {generateSwaggerModel, /* generateSwaggerParams */} from './swaggerModel' 

/**
 * Méthode permettant de générer un schéma mongoose à partir d'un fichier JSON.
 * @param p Chemin du fichier JSON qui doit être converti
 * @returns Retourne un schéma mongoose
 */
export function JsonToMongooseSchema(p: string): mongoose.Schema {
    let json: any = JSON.parse(fs.readFileSync(p,'utf8'));
    let mongooseSchema: mongoose.Schema = <mongoose.Schema>generateSchema.mongoose(json);
    return mongooseSchema
}

// console.log(JsonToMongooseSchema("/Users/alasserre/cours/webservices/ExpressingJS/src/models/todo.json"))


/**
 * Méthode qui boucle sur tout le dossier models et qui va générer tous les schémas mongoose à partir des
 * fichiers JSON construit par l'utilisateur. 
 */
export function JsonModelsToMongooseSchemas(app: express.Application) {
    let p = path.join(__dirname, '../models');
    fs.readdir(p, (err, files) => {
        if(err) {
            console.log(err)
        }
        else {
            if(!files.length) {
                console.log("ERREUR : Le dossier est vide, aucun modèle n'a été crée")
            }
            else {
                console.log(`${files.length} modèles sont configurés dans le dossier 'models':`)
                files.forEach(file => {
                    let p: string = path.join(__dirname, `../models/${file}`);
                    let schema = JsonToMongooseSchema(p)
                    let filename = file.split('.').slice(0, -1).join('.');
                    let models;
                    try {
                        models = mongoose.model(filename)
                    } catch(err) {
                        models = mongoose.model(filename, schema)
                    }
                    
                    app.use(`/api/${filename}`,require('./crud')(mongoose.model(filename)))
                    console.log(`Model: /${filename}`)

                    // Insert routes in swagger
                    const swaggerModel = generateSwaggerModel(filename)
                    // const swaggerParams = generateSwaggerParams(p, filename)
                    const tag = filename.charAt(0).toUpperCase() + filename.slice(1)
                    swaggerDocument.paths[`${filename}s`] = swaggerModel
                    // swaggerDocument.definitions[`${filename}`].properties = swaggerParams

                });
                app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
            }
        }
    })
}