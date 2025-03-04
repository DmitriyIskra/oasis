export default class RestApiAccountPageProfile {
    constructor(createPath, readPath, updatePath, deletePath) {
        this.createPath = createPath;
        this.readPath = readPath;
        this.updatePath = updatePath;
        this.deletePath = deletePath;
    }

    async create(data) {
        return true;
        try {
            const response = await fetch(this.createPath, {
                method: 'POST',
                headers: {

                },
                body: JSON.stringify(data),
            });

            const respData = response.json();
        } catch (error) {
            
        }
    }

    async read() {
        try {
            const response = await fetch(this.readPath);

            const respData = response.json();
        } catch (error) {
            
        }
    }

    async update() {
        try {
            const response = await fetch(this.updatePath, {
                method: 'PATCH',
                headers: {

                },
                body: JSON.stringify(data),
            });

            const respData = response.json();
        } catch (error) {
            
        }
    }

    async delete() {
        try {
            const response = await fetch(this.deletePath, {
                method: 'DELETE',
                headers: {

                },
                body: JSON.stringify(data),
            });

            const respData = response.json();
        } catch (error) {
            
        }
    }
}