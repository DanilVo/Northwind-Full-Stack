import mysql, { MysqlError } from 'mysql';
import appConfig from './app-config';

// Creating connection object:
const connection = mysql.createPool({
  host: appConfig.mysqlHost, // DB computer address
  user: appConfig.mysqlUser, // DB username
  password: appConfig.mysqlPassword, // DB password
  database: appConfig.mysqlDatabase, // DB name
});

function execute(sql: string, values?: any[]): Promise<any> {
  // Promisify
  return new Promise<any>((resolve, reject) => {
    connection.query(sql,values, (err: MysqlError, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export default {
  execute,
};
