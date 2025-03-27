export default class StorageMenuAccount {
    #userData = null;


    // только объект
    get userData() {
        return this.#userData;
    }

    set userData(data = null) {
        if(!data) throw new Error("Метод __set ожидает 1 параметр");

        if (typeof data === 'object' && !Array.isArray(data)) {
            if(!this.#userData) this.#userData = data;
            if(this.#userData) this.#userData = {...this.#userData, ...data};
        } else {
            throw new Error("Передаваемый тип данных должен быть 'object', не array");
        } 
    }
}