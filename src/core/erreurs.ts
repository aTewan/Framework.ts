import chalk from 'chalk'

const err = `Erreur : `
const war = `Attention : `;

export const VALEUR_PAS_NUMERIQUE: String = chalk.bold.red(`${err} La valeur renseignée pour le port n'est pas une valeur numérique.`);

export const PAS_DE_PORT: String = chalk.bold.yellow(`${war} Vous n'avez pas renseigné de valeur pour le port, la valeur par défaut est`);

export const MEME_PORT_DB_SERVER: String = chalk.bold.red(`${err} La base de données et le serveur ne peuvent pas utiliser le même port.`);