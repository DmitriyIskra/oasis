export default class ControllResponsePopUp {
    constructor(redraw, rest) {
        this.redraw = redraw;
        this.rest = rest;

        this.dialog = document.querySelector('dialog');
        this.wrContentDialog = this.dialog.querySelector('.dialog__content');
        this.buttonBack = this.dialog.querySelector('.dialog__back');
        this.buttonClose = this.dialog.querySelector('.dialog__close');

        this.closeModal = this.closeModal.bind(this);
        this.eventHandler = this.eventHandler.bind(this);
    }

    init() {
        this.registerEvents('close');
    }

    registerEvents(param) {
        // Постоянный слушатель
        // слушатель для кнопки закрытия модалки 
        if(param === 'close') this.buttonClose.addEventListener('click', this.closeModal);
        
        // Временные слушатели (снимаются с контента модалки при ее закрытии
        // для того чтобы в дальнейшем могла быть модалка с другим контентом и другим функционалом)
        // данные профиля успешно отредактированы
        if(param === '') {
            
        }
    }

    removeEvents() {
        this.wrContentDialog.removeEventListener('click', this.eventHandler);
    }

    async getModal(dir, name) {
        // получаем данные в виде document
        const response = await this.rest.read(dir, name);
        // извлекаем из document контент
        const contentModal = [...response.body.children];

        // наполняем контент модалного окна
        contentModal.forEach(el => this.wrContentDialog.append(el));

        // регистрируем события по параметру
        this.registerEvents();

        return this.dialog;
    }

    closeModal() {
        if(this.buttonBack.classList.contains('dialog__back_active')) {
            this.buttonBack.classList.remove('dialog__back_active')
        }

        document.body.style.overflow = '';
        this.dialog.close();
    }

    // метод для назначения функционала по событию (для удаления при закрытии)
    eventHandler(param) {
        if(param === '') {
            
        }

        if(param === '') {

        }

        if(param === '') {

        }
    }
}