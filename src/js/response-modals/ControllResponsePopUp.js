export default class ControllResponsePopUp {
    constructor(redraw, rest) {
        this.redraw = redraw;
        this.rest = rest;

        this.closeModal = this.closeModal.bind(this);
        this.onClick = null;
    }

    init() {
        this.registerEvents('close');
    }

    registerEvents(param) {
        // Постоянный слушатель
        // слушатель для кнопки закрытия модалки 
        if(param === 'close') this.redraw.buttonClose.addEventListener('click', this.closeModal);
        
        // Временные слушатели (снимаются с контента модалки при ее закрытии
        // для того чтобы в дальнейшем могла быть модалка с другим контентом и другим функционалом)
        // данные профиля успешно отредактированы
        if(param === 'delete-profile') {
            this.redraw.wrContentDialog.addEventListener('click', this.onClick);
        }
    }

    removeEvents() {
        this.redraw.wrContentDialog.removeEventListener('click', this.onClick);
    }

    async getModal(dir, name = null) {
        // получаем данные в виде document
        const response = await this.rest.read(dir, name);
        // извлекаем из document контент
        const contentModal = [...response.body.children];

        // наполняем контент модалного окна
        contentModal.forEach(el => this.redraw.wrContentDialog.append(el));

        // регистрируем события по параметру
        this.registerEvents('delete-profile');

        return this.redraw.dialog;
    }

    showModal() {
        this.redraw.showModal();
    }

    closeModal() {
        this.redraw.closeModal();
        this.removeEvents();
        this.onClick = null;
    }


    // данный метод принимет другой метод с привязанным контекстом и необходимой функциональностью
    registerHandlerOnClick(eventName, method) {
        if(eventName === 'click') {
            this.onClick = method;
        }
    }
}