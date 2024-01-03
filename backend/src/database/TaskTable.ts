import * as mysql from 'mysql';
import Task from '../common/Task';
import MySQLAdapter from './MySQLAdapter';
import dayjs from 'dayjs';

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
            created_at DATETIME(3) NOT NULL,
            content TEXT NOT NULL,
            due_date TEXT,
            completed BOOLEAN NOT NULL,
            PRIMARY KEY(id(22))
            )`;
        this.database.query(query);
    }

    public close() {
        this.database.disconnect();
    }

    public async append(task: Task) {
        if (task == null) throw new Error("task is null");

        let query = "INSERT INTO task (id, created_at, content, due_date, completed) VALUES (?,?,?,?,?)";
        let due_date = task.getDueDate().isValid() ? task.getDueDate().format(Task.DATE_FORMAT) : null;
        let values = [task.getId(), task.getCreatedAt().format(Task.DATE_FORMAT), task.getContent(), due_date, task.isCompleted()];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    public async findAll(): Promise<Task[]> {
        let query = "SELECT * FROM task";
        let tasks: Task[] = await this.find(query, []);
        return tasks;
    }

    public async findById(id: string): Promise<Task> {
        if (String.isNull(id)) throw new Error("id is null");

        let query = "SELECT * FROM task WHERE id = ?";
        let values = [id];
        let tasks = await this.find(query, values);
        if (tasks.length > 0) return tasks[0];
        else return new Task("", dayjs(), "", dayjs(), false);
    }

    private async find(query: string, values: any[]): Promise<Task[]> {
        let tasks: Task[] = [];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            for (let row of result) {
                let task = new Task(row.id, dayjs(row.created_at), row.content, dayjs(row.due_date), Boolean(row.completed));
                tasks.push(task);
            }
        });
        return tasks;
    }

    public async update(task: Task): Promise<number> {
        if (task == null) throw new Error("task is null");

        let query = "UPDATE task SET content = ?, due_date = ?, completed = ? WHERE id = ?";
        let due_date = task.getDueDate().isValid() ? task.getDueDate().format(Task.DATE_FORMAT) : null;
        let values = [task.getContent(), due_date, task.isCompleted(), task.getId()];
        let res = await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record updated");
            return result;
        });
        return res["changedRows"] ?? 0;
    }

    public async deleteById(id: string): Promise<number> {
        if (String.isNull(id)) throw new Error("id is null");

        let query = "DELETE FROM task WHERE id = ?";
        let values = [id];
        let res = await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log("1 record deleted");
            return result;
        });
        return res["affectedRows"] ?? 0;
    }

    public async deleteAll() {
        let query = "DELETE FROM task";
        await this.database.query(query, (err, result) => {
            if (err) throw err;
            console.log("All records deleted");
        });
    }

}