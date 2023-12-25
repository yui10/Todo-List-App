import * as mysql from 'mysql';
import Task from '../common/Task';
import MySQLAdapter from './MySQLAdapter';

export default class TaskTable {
    private database: MySQLAdapter;
    constructor() {
        let config: mysql.ConnectionConfig = {
            host: "db",
            port: 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            stringifyObjects: true,
        };
        this.database = new MySQLAdapter(config);
        this.database.connect();
        let query = `CREATE TABLE IF NOT EXISTS task (
            id TEXT NOT NULL,
            content TEXT NOT NULL,
            due_date TEXT NOT NULL,
            completed BOOLEAN NOT NULL,
            PRIMARY KEY(id(32))
            )`;
        this.database.query(query);
    }

    public close() {
        this.database.disconnect();
    }

    public async append(task: Task) {
        if (task == null) throw new Error("task is null");

        let query = "INSERT INTO task (id, content, due_date, completed) VALUES (?,?,?,?)";
        let values = [task.getId(), task.getContent(), task.getDueDate(), task.isCompleted()];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    public async findAll(): Promise<Task[]> {
        let query = "SELECT * FROM task";
        let tasks: Task[] = [];
        await this.database.query(query, (err, result) => {
            if (err) throw err;
            for (let row of result) {
                let task = new Task(row.id, row.content, row.due_date, Boolean(row.completed));
                tasks.push(task);
            }
        });
        return tasks;
    }

    public async findById(id: string): Promise<Task> {
        if (String.isNull(id)) throw new Error("id is null");

        let query = "SELECT * FROM task WHERE id = ?";
        let values = [id];
        let task: Task = new Task("", "", "", false);
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            if (result.length == 0) return null;
            let row = result[0];
            task = new Task(row.id, row.content, row.due_date, Boolean(row.completed));
        });
        return task;
    }

    public async update(task: Task): Promise<number> {
        if (task == null) throw new Error("task is null");

        let query = "UPDATE task SET content = ?, due_date = ?, completed = ? WHERE id = ?";
        let values = [task.getContent(), task.getDueDate(), task.isCompleted(), task.getId()];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record updated");
        });
        let res = await this.database.query("SELECT ROW_COUNT() as count;", values, (err, result) => {
            if (err) throw err;
            return result;
        });
        let count = res[0]["count"];
        return count ?? 0;
    }

    public async deleteById(id: string): Promise<number> {
        if (String.isNull(id)) throw new Error("id is null");

        let query = "DELETE FROM task WHERE id = ?";
        let values = [id];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record deleted");
        });
        let res = await this.database.query("SELECT ROW_COUNT() as count;", values, (err, result) => {
            if (err) throw err;
            return result;
        });
        let count = res[0]["count"];
        return count ?? 0;
    }

    public async deleteAll() {
        let query = "DELETE FROM task";
        await this.database.query(query, (err, result) => {
            if (err) throw err;
            console.log("All records deleted");
        });
    }

}