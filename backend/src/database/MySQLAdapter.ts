/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mysql from 'mysql';

export default class MySQLAdapter {
    public connection: mysql.Connection;

    constructor(config: mysql.ConnectionConfig) {
        this.connection = mysql.createConnection(config);
    }

    public getConnection(): mysql.Connection {
        return this.connection;
    }

    public connect() {
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        });
    }

    public disconnect() {
        this.connection.end();
    }

    public query(query: string | mysql.QueryOptions, callback?: mysql.queryCallback): Promise<any>;
    public query(query: string, values: any, callback?: mysql.queryCallback): Promise<any>;

    public query(
        ...args: [string | mysql.QueryOptions, mysql.queryCallback?] | [string, any, mysql.queryCallback?]
    ): Promise<any> {
        // eslint-disable-next-line prefer-const
        let [query, values, callback] = args;
        if (typeof values === 'function') {
            callback = values;
            values = undefined;
        }

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, result) => {
                if (err) return reject(err);
                if (callback) callback(err, result);
                resolve(result);
                return result;
            });
        });
    }
}
