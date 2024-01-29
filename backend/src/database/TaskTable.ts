import * as mysql from 'mysql';
import dayjs from 'dayjs';
import Task from '../common/Task';
import MySQLAdapter from './MySQLAdapter';

export default class TaskTable {
    private database: MySQLAdapter;

    constructor() {
        const config: mysql.ConnectionConfig = {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            stringifyObjects: true,
        };
        this.database = new MySQLAdapter(config);
        this.database.connect();
        const query = `CREATE TABLE IF NOT EXISTS task (
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
        if (task == null) throw new Error('task is null');

        const query = 'INSERT INTO task (id, created_at, content, due_date, completed) VALUES (?,?,?,?,?)';
        const values = [
            task.getId(),
            task.getCreatedAt().format(Task.DATE_FORMAT),
            task.getContent(),
            task.getDueDate().isValid() ? task.getDueDate().format(Task.DATE_FORMAT) : null,
            task.isCompleted(),
        ];
        await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log('1 record inserted');
            return result;
        });
    }

    public async findAll(): Promise<Task[]> {
        const query = 'SELECT * FROM task';
        const tasks: Task[] = await this.find(query, []);
        return tasks;
    }

    public async findById(id: string): Promise<Task> {
        if (String.isNull(id)) throw new Error('id is null');

        const query = 'SELECT * FROM task WHERE id = ?';
        const values = [id];
        const tasks = await this.find(query, values);
        if (tasks.length > 0) return tasks[0];

        return new Task('', dayjs(), '', dayjs(), false);
    }

    private async find(query: string, values: unknown[]): Promise<Task[]> {
        const result = await this.database.query(query, values);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tasks: Task[] = result.map((row: any) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { id, created_at, content, due_date, completed } = row;
            return new Task(id, dayjs(created_at), content, dayjs(due_date), Boolean(completed));
        });
        return tasks;
    }

    public async update(task: Task): Promise<number> {
        if (task == null) throw new Error('task is null');

        const query = 'UPDATE task SET content = ?, due_date = ?, completed = ? WHERE id = ?';
        const dueDate = task.getDueDate().isValid() ? task.getDueDate().format(Task.DATE_FORMAT) : null;
        const values = [task.getContent(), dueDate, task.isCompleted(), task.getId()];
        const res = await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log('1 record updated');
            return result;
        });
        return res.changedRows ?? 0;
    }

    public async deleteById(id: string): Promise<number> {
        if (String.isNull(id)) throw new Error('id is null');

        const query = 'DELETE FROM task WHERE id = ?';
        const values = [id];
        const res = await this.database.query(query, values, (err, result) => {
            if (err) throw err;
            console.log('1 record deleted');
            return result;
        });
        return res.affectedRows ?? 0;
    }

    public async deleteAll() {
        const query = 'DELETE FROM task';
        await this.database.query(query, (err, result) => {
            if (err) throw err;
            console.log('All records deleted');
            return result;
        });
    }
}
