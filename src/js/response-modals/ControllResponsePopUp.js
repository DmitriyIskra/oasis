export default class ControllResponsePopUp {
    constructor(redraw, rest) {
        this.redraw = redraw;
        this.rest = rest;

        this.closeModal = this.closeModal.bind(this);
        this.click = null;
        this.focus = null;
        this.change = null;
    }

    init() {
        this.registerEvents('close');
    }

    registerEvents(param = null) {
        // Постоянный слушатель
        // слушатель для кнопки закрытия модалки 
        if(param === 'close') this.redraw.buttonClose.addEventListener('click', this.closeModal);
         
        // навешиваем слушатели на контент попап
        if(this.click) this.redraw.dialog.addEventListener('click', this.click);
        if(this.focus) this.redraw.dialog.addEventListener('focus', this.focus, {capture:true});
        if(this.change) this.redraw.dialog.addEventListener('change', this.change, {capture:true});
    }

    removeEvents() {
        this.redraw.dialog.removeEventListener('click', this.click);
        this.redraw.dialog.removeEventListener('focus', this.focus);
        this.redraw.dialog.removeEventListener('change', this.change);
    }

    async getModal(dir, name = null) {
        // получаем данные в виде document
        const response = await this.rest.read(dir, name);
        // извлекаем из document контент
        const contentModal = [...response.body.children];

        // наполняем контент модалного окна
        contentModal.forEach(el => this.redraw.wrContentDialog.append(el));

        // let elTel;
        // switch (name) {
        //     case 'reg2':
        //         this.redraw.showArrowBack();
        //         elTel = this.redraw.dialog.querySelector('input[name="phone"]');
        //         this.redraw.addIMask(elTel);
        //     break;
        //     case 'check-phone':
        //         this.redraw.showArrowBack();
        // }

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
        this.change = null;

        if(this.redraw.currentImask) this.redraw.removeIMask();
    }


    // данный метод принимет другой метод с привязанным контекстом и необходимой функциональностью
    saveHandler(eventName, method) {
        this[eventName] = method;
    }
}