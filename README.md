# lol.ts
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

Une fois le modèle généré (avec schema typeorm etc + sqlite)
## Génération du controller avec les routes
- Définition des 4 routes basiques (`GET`,`POST`,`UPDATE`,`DELETE`)

## Génération de vue
- Pug
- Faire en sorte que l'utilisateur puisse customiser ça
