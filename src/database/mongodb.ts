import { Db, MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

class MongoDatabase {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(mongoURI!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.db = this.client.db("app-flutter");
  }

  public getInstance() {
    return this.db;
  }
}

const db = new MongoDatabase().getInstance();

export { db };
