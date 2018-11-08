import * as path from 'path'
import * as fs from 'fs'

/**
 * Interface for MongoConfig Object
 * @interface
 */
interface IMongoConfig {
  user: String
  pass: String | null
  db: String
  host: String
  port: Number | null
  authMechanism: String | null
}

/**
 * Interface in order to make IMongoConfig serializable
 * @interface
 */
interface Serializable<T> {
  deserialize(input: IMongoConfig): T;
}

/**
 * MongoConfig's class
 * @class
 */
class MongoConfig implements Serializable<MongoConfig> {
  user: String
  pass: String | null
  db: String
  host: String
  port: Number | null
  authMechanism: String | null

  /**
   * Method which make us able to instanciate a JSON file into a MongoConfig object
   * @memberof MongoConfig
   * @param input 
   */
  deserialize(input: IMongoConfig): MongoConfig {
    this.user = input.user;
    this.pass = input.pass;
    this.db = input.db;
    this.host = input.host;

    if(input.port !== null) {
      this.port = input.port;
    }
    else {
      this.port = 27017;
    }
    this.authMechanism = input.authMechanism;

    return this;
  }
}

/**
 * Method which get the mongo config from db-config.json
 */
function getMongoConfig(): MongoConfig {
  let p = path.join(__dirname, '../config/db-config.json');
  let json: JSON = JSON.parse(fs.readFileSync(p,'utf8'));
  let mongoConfig = new MongoConfig().deserialize(<IMongoConfig><unknown>json);
  return mongoConfig;
}


export const mongoConfig: MongoConfig = getMongoConfig();