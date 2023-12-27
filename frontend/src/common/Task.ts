import dayjs from "dayjs";

export default class Task {
    private id: string;
    private created_at: dayjs.Dayjs;
    private content: string;
    private due_date: string;
    private completed: boolean;

    constructor(id: string, created_at: dayjs.Dayjs, content: string, due_date: string, completed: boolean = false) {
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

    public getDueDate(): string {
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
