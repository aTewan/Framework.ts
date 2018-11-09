import chalk from 'chalk'

const err = `Error : `
const war = `Warning : `;

export const NOT_NUMERICAL_VALUE: String = chalk.bold.red(`${err} The value used for port isn't a numerical value.`);

export const NO_PORT: String = chalk.bold.yellow(`${war} Port's value is still null in the file server-config.json, the default value is `);

export const SAME_PORT_DB_SERVER: String = chalk.bold.red(`${err} The database and the server are using the same port.`);

export const EMPTY_FOLDER_NO_MODELS: String = chalk.bold.red(`${err} The folder is empty, no models have been created !`);