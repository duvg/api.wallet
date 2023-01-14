import { createPool, Pool } from 'mysql2/promise';

export class MySqlPool {
  public createMySqlPool(): Pool {
    return createPool({
      host: process.env.DB_MYSQL_HOST as string,
      user: process.env.DB_MYSQL_USER as string,
      password: process.env.DB_MYSQL_PASSWORD as string,
      database: process.env.DB_MYSQL_DATABASE as string,
      decimalNumbers: true,
    });
  }
}
