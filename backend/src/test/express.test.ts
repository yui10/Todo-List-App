import request from 'supertest';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import app from '../app';
import Task from '../common/Task';
import TaskTable from '../database/TaskTable';

const taskTable = new TaskTable();

describe('Express API', () => {
    const ids: string[] = [uuid(), uuid(), uuid()];
    ids.sort();
    const tasks: Task[] = ids.map((id) => new Task(id, dayjs(), 'content', dayjs().add(1, 'day'), false));

    beforeEach(async () => {
        await taskTable.deleteAll();
    });

    afterEach(async () => {
        await taskTable.deleteAll();
    });

    afterAll(async () => {
        await taskTable.deleteAll();
        taskTable.close();
    });

    test('GET /api/task', async () => {
        await Promise.all(tasks.map((task) => taskTable.append(task)));

        const response = await request(app).get('/api/task').set('Accept', 'application/json');

        expect(response.status).toBe(200);

        const resObject = JSON.parse(response.text);
        const resTask: Task[] = [];
        for (let i = 0; i < resObject.length; i += 1) {
            resTask.push(
                new Task(
                    resObject[i].id,
                    dayjs(resObject[i].created_at),
                    resObject[i].content,
                    dayjs(resObject[i].due_date),
                    resObject[i].completed
                )
            );
        }

        expect(resTask).toEqual(tasks);
    });

    test('POST /api/task', async () => {
        let task = tasks[0];
        const response = await request(app).post('/api/task').send(task).set('Accept', 'application/json');
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id, created_at } = JSON.parse(response.text);
        task = new Task(id, dayjs(created_at), task.getContent(), task.getDueDate(), task.isCompleted());

        expect(response.status).toBe(201);

        const resObject = JSON.parse(response.text);
        const resTask = new Task(
            resObject.id,
            dayjs(resObject.created_at),
            resObject.content,
            dayjs(resObject.due_date),
            resObject.completed
        );
        expect(resTask).toEqual(task);
    });

    test('PUT /api/task/:id', async () => {
        let task = tasks[0];
        await taskTable.append(task);

        task = new Task(task.getId(), task.getCreatedAt(), 'updated content', task.getDueDate(), task.isCompleted());
        const response = await request(app)
            .put(`/api/task/${task.getId()}`)
            .send(task)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);

        const resObject = JSON.parse(response.text);
        const resTask = new Task(
            resObject.id,
            dayjs(resObject.created_at),
            resObject.content,
            dayjs(resObject.due_date),
            resObject.completed
        );
        expect(resTask).toEqual(task);
    });

    test('DELETE /api/task/:id', async () => {
        const task = tasks[0];
        await taskTable.append(task);

        const response = await request(app).delete(`/api/task/${task.getId()}`).set('Accept', 'application/json');
        expect(response.status).toBe(200);
        const resObject = JSON.parse(response.text);
        expect(resObject.id).toEqual(task.getId());
        const tasksRes = await taskTable.findAll();
        expect(tasksRes.length).toBe(0);
    });

    test('DELETE /api/task/:id (not found)', async () => {
        const response = await request(app).delete(`/api/task/${uuid()}`).set('Accept', 'application/json');
        expect(response.status).toBe(404);
        const tasksRes = await taskTable.findAll();
        expect(tasksRes.length).toBe(0);
    });
});
