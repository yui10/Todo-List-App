import dayjs from 'dayjs';
import './string.extension';

export default class Task {
    public static readonly DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

    private id: string;

    private created_at: dayjs.Dayjs;

    private content: string;

    private due_date: dayjs.Dayjs;

    private completed: boolean;

    constructor(
        id: string,
        created_at: dayjs.Dayjs,
        content: string,
        due_date: dayjs.Dayjs,
        completed: boolean = false
    ) {
        if (String.isNull(id)) throw new Error('id is null');
        if (created_at == null) throw new Error('created_at is null');
        if (String.isNull(content)) throw new Error('content is null');

        this.id = id;
        this.created_at = created_at;
        this.content = content;
        this.due_date = due_date;
        this.completed = completed;
    }

    public getId(): string {
        return this.id;
    }

    public getCreatedAt(): dayjs.Dayjs {
        return this.created_at;
    }

    public getContent(): string {
        return this.content;
    }

    public getDueDate(): dayjs.Dayjs {
        return this.due_date;
    }

    /**
     * task is completed if status is COMPLETED and completed is true
     * @returns true if the task is completed, false otherwise
     */
    public isCompleted(): boolean {
        return this.completed;
    }
}
