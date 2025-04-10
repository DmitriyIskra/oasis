export default class RestApiAccountPageProfile {
    constructor(paths) {
        this.paths = paths;
    }

    async create(data) {
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
        return true;
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
        return false;
        try {
            const response = await fetch(this.paths.delete, {
                method: 'DELETE',
                headers: {

                },
                body: JSON.stringify(data),
            });

            const respData = response.json();
        } catch (error) {
            console.error('Операция удаления аккаунта завершилась ошибкой: ', error);
        }
    }
}