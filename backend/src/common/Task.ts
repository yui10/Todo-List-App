import './string.extension';

export default class Task {
    private id: string;
    private content: string;
    private due_date: string;
    private completed: boolean;



    constructor(id: string, content: string, due_date: string, completed: boolean = false) {
        if (String.isNull(id)) throw new Error("id is null");
        if (String.isNull(content)) throw new Error("content is null");
        if (String.isNull(due_date)) throw new Error("due_date is null");

        this.id = id;
        this.content = content;
        this.due_date = due_date;
        this.completed = completed;
    }

    public getId(): string {
        return this.id;
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
