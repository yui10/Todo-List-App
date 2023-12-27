const baseUrl = 'http://localhost:3001';

export default class Fetch {
    static async get(path: string) {
        const response = await fetch(`${baseUrl}${path}`, { method: 'GET' });
        return response.json();
    }

    static async post(path: string, body: any) {
        const response = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        return response.json();
    }

    static async put(path: string, body: any) {
        const response = await fetch(`${baseUrl}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        return response.json();
    }

    static async delete(path: string) {
        const response = await fetch(`${baseUrl}${path}`, {
            method: 'DELETE',
        });
        return response.json();
    }
}
