import * as path from 'path'
import * as fs from 'fs'

interface IMongoConfig {
  user: String
  pass: String | null
  db: String
  host: String
  port: Number | null
  authMechanism: String | null
}

interface Serializable<T> {
  deserialize(input: IMongoConfig): T;
}

class MongoConfig implements Serializable<MongoConfig> {
  user: String
  pass: String | null
  db: String
  host: String
  port: Number | null
  authMechanism: String | null

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

function recupererMongoConfig(): MongoConfig {
  let p = path.join(__dirname, '../config/db-config.json');
  let json: JSON = JSON.parse(fs.readFileSync(p,'utf8'));
  let mongoConfig = new MongoConfig().deserialize(<IMongoConfig><unknown>json);
  return mongoConfig;
}


export const mongoConfig: MongoConfig = recupererMongoConfig();