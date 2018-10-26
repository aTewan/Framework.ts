# lol.ts
C'est notre framework

## 1ère étape : Création de model
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
## 2ème étape : Génération du controller avec les routes

## 3ème étape : Génération de l'app (serveur)

## Bazar
- BDD (+ choix ORM)
- Vue (choix du truc de vue style pug, twig)
