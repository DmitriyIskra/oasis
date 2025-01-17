export default class RestReviewsModal {
    constructor(path) {
        this.path = path;
        
    }

    async create(data) {
        return true // заглушка для тестов модалок с результатами
        try {
            const response = await fetch(`${this.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : '',
                },
                body: JSON.stringify(data),
            });
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }

    async read() {
        try {
            const response = await fetch(`${this.path}`);
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }

    async update(data) {
        try {
            const response = await fetch(`${this.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : '',
                },
                body: JSON.stringify(data),
            });
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }

    async delete() {
        try {
            const response = await fetch(`${this.path}`);
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }
}