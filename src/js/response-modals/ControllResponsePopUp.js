export default class ControllResponsePopUp {
    constructor(redraw, rest) {
        this.redraw = redraw;
        this.rest = rest;

        this.closeModal = this.closeModal.bind(this);
        this.click = null;
        this.focus = null;
    }

    init() {
        this.registerEvents('close');
    }

    registerEvents(param = null) {
        // Постоянный слушатель
        // слушатель для кнопки закрытия модалки 
        if(param === 'close') this.redraw.buttonClose.addEventListener('click', this.closeModal);
         
        // навешиваем слушатели на контент попап
        if(this.click) this.redraw.wrContentDialog.addEventListener('click', this.click);
        if(this.focus) this.redraw.wrContentDialog.addEventListener('focus', this.focus, {capture:true});
    }

    removeEvents() {
        this.redraw.wrContentDialog.removeEventListener('click', this.click);
        this.redraw.wrContentDialog.removeEventListener('focus', this.focus);
    }

    async getModal(dir, name = null) {
        // получаем данные в виде document
        const response = await this.rest.read(dir, name);
        // извлекаем из document контент
        const contentModal = [...response.body.children];

        // наполняем контент модалного окна
        contentModal.forEach(el => this.redraw.wrContentDialog.append(el));

        // регистрируем события
        this.registerEvents();

        return this.redraw.dialog;
    }

    // если true или ничего не передано, значит попап открывается впервые
    // и нужны все действия, если false то подложка не исчезает просто в попап меняется контент
    showModal(fullShow = true) {
        this.redraw.showModal(fullShow);
    }

    // если true или ничего не передано, значит попап закрывается полностью и подложка исчезает
    // и нужны все действия, если false то подложка не исчезает просто в попап меняется контент
    closeModal(fullClose = true) {
        this.redraw.closeModal(fullClose);
        this.removeEvents();
        this.click = null;
        this.focus = null;
    }


    // данный метод принимет другой метод с привязанным контекстом и необходимой функциональностью
    saveHandler(eventName, method) {
        this[eventName] = method;
    }
}