# Framework.ts
C'est notre framework

## Génération de l'app (serveur)
Exemple : `{
    "port": 8080
}`

## Création de model
Par fichier de configuration : dans le dossier 'model', un fichier par modèle.
Exemple : `{
    name: 'User'
    attributes: {
        id: 'number',
        name: 'string'
    },
    relations: {
        teams: {
            model: 'Team',
            type: 'belongsToMany'
        }
    }
}`


## Génération de vue
- Pug
- Faire en sorte que l'utilisateur puisse customiser ça
