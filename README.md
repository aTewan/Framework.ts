# lol.ts
C'est notre framework

## Génération de l'app (serveur)

## Création de model
À partir d'un modèle par défaut(?)
- Par fichier de configuration
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
- Par méthode (nom du modele, propriétés, relations)
`creerModele('User',{id: 'number',name: 'string'},{relations: {teams: {model: 'Team',type: 'belongsToMany'}}})`
- Par CLI

Une fois le modèle généré (avec schema typeorm etc + sqlite)
## Génération du controller avec les routes
- Définition des 4 routes basiques (`GET`,`POST`,`UPDATE`,`DELETE`)

## Génération de vue
- Pug
- Faire en sorte que l'utilisateur peut customiser ça
