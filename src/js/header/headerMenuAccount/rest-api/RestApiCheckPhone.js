export default class RestApiCheckPhone {
    constructor(paths) {
        this.paths = paths;
        
    }

    async create(data) {
        return false
        try {
            const response = await fetch(`${this.paths.create}`, {
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
            const response = await fetch(`${this.paths.read}`);
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }

    async update(data) {
        try {
            const response = await fetch(`${this.paths.update}`, {
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
            const response = await fetch(`${this.path.delete}`);
            const data = response.json();
        } catch (error) {
            throw new Error('');
        }
    }
}