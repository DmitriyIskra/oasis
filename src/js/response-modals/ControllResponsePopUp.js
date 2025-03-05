export default class ControllResponsePopUp {
    constructor(redraw, rest) {
        this.redraw = redraw;
        this.rest = rest;

        this.closeModal = this.closeModal.bind(this);
        this.onClick = this.onClick.bind(this);
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
            const deleteButton = this.redraw.wrContentDialog.querySelector('.dialog__button-send');
            const cancelButton = this.redraw.wrContentDialog.querySelector('.dialog__button-cancel');

            this.redraw.wrContentDialog.addEventListener('click')
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
    }

    // метод для назначения функционала по событию (для удаления при закрытии)
    onClick(e) {
        // удалить аккаунт
        if(e.target.closest('.dialog__button-send')) {
            
        }
        // отменить удаление аккаунта
        if(e.target.closest('.dialog__button-cancel')) {
            
        }

        if(e.target.closest('')) {
            
        }
    }
}