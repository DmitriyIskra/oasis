export default class RestApiAccountPageProfile {
    constructor(paths) {
        this.paths = paths;
    }

    async create(data) {
        console.log(Object.fromEntries(data))
        return true;
        try {
            const response = await fetch(this.paths.create, {
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
            const response = await fetch(this.paths.read);

            const respData = response.json();
        } catch (error) {
            
        }
    }

    async update() {
        try {
            const response = await fetch(this.paths.update, {
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
            const response = await fetch(this.paths.delete, {
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