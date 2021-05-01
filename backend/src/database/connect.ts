import { createConnection, Connection } from "typeorm";
import configs from "../config";

/**
 * handle database connection using singleton pattern
 * @public
 */
export default class InitDBConnection {
  private static dbInstance: Connection;

  private constructor() {}

  public static async connect(): Promise<Connection> {
    console.log({
      type: "mysql",
      host: configs.DB_CONFIG.DB_SERVER,
      port: 3306,
      synchronize: process.env.NODE_ENV === "local",
      logging: process.env.NODE_ENV === "local",
      username: configs.DB_CONFIG.DB_USER,
      password: configs.DB_CONFIG.DB_PASSWORD,
      database: configs.DB_CONFIG.BD_DATABASE,
      entities: ["build/entities/**/*.js"],
    });
    try {
      if (!InitDBConnection.dbInstance) {
        InitDBConnection.dbInstance = await createConnection({
          type: "mysql",
          host: configs.DB_CONFIG.DB_SERVER,
          port: 3306,
          synchronize: process.env.NODE_ENV === "local",
          logging: process.env.NODE_ENV === "local",
          username: configs.DB_CONFIG.DB_USER,
          password: configs.DB_CONFIG.DB_PASSWORD,
          database: configs.DB_CONFIG.BD_DATABASE,
          entities: ["build/entities/**/*.js"],
        });
      }
      return InitDBConnection.dbInstance;
    } catch (error) {
      console.error(error);
      throw new Error("database connection error");
    }
  }
}
