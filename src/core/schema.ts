import * as generateSchema from 'generate-schema'
import * as fs from 'fs'
import * as path from 'path'
import * as mongoose from 'mongoose'

export function genererMongooseSchema(p: string): mongoose.Schema {
    let json: any = JSON.parse(fs.readFileSync(p,'utf8'));
    console.log(json)
    console.log("Schéma :")
    let mongooseSchema: any = generateSchema.mongoose(json);
    return <mongoose.Schema> mongooseSchema
}

/**
 * Parcourir tout le dossier models
 * -> check s'il y a des fichiers json de définition de model
 * ->prendre le titre du fichier
 * -> Pour chaque
 * -> génération du schema mongoose
 * -> mongoose.model(nom_modele, schemaGénéré)
 */
//genererMongooseSchema(path.join(__dirname, `../models/todo.json`));

export function parcourirDossierModels() {
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
                console.log(`Il y a ${files.length} fichiers dans le dossier models`)
                files.forEach(file => {
                    let p: string = path.join(__dirname, `../models/${file}`);
                    let schema = genererMongooseSchema(p)
                    let filename = file.split('.').slice(0, -1).join('.');
                    let models;
                    try {
                        models = mongoose.model(filename)
                    } catch(err) {
                        models = mongoose.model(filename, schema)
                    }
                    console.log(filename)
                });
            }
        }
    })
}

parcourirDossierModels();