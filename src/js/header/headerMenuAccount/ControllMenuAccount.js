export default class ControllMenuAccount {
    constructor(redraw, modals, handlers, validation, restApi) {
        this.redraw = redraw;
        this.modals = modals;
        this.handlers = handlers;
        this.validation = validation;
        this.restApi = restApi;
        
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.click = this.click.bind(this);

        this.activeModal = null;
        this.activeHandler = null;
    }

    init() {
        this.registerEvents(); 
    }

    registerEvents() {
        this.redraw.el.addEventListener('mousemove', this.mouseMove);
        this.redraw.el.addEventListener('mouseout', this.mouseOut);
        this.redraw.el.addEventListener('click', this.click);
    }

    mouseMove(e) {
        if(e.target.closest('.header__account-icon')) {
            this.redraw.open();
        }
    }

    mouseOut(e) {
        if(e.relatedTarget && (e.relatedTarget.closest('main') || 
        e.relatedTarget.closest('.header__wr-favourite-icon') ||
        e.target.closest('.header__wr-basket-icon'))) {
            this.redraw.close();
        }
    }

    click(e) {
        // открытие попап вход регистрация по иконке, если пользователь не в аккаунте 
        if(e.target.closest('.header__account-icon-link') && Boolean(e.target.hash)) {
            this.redraw.close();
            // прикрепляем контекст
            this.activeHandler = this.handlers.auth.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                this.activeModal = await this.modals.getModal('auth');
                this.modals.showModal();
            })()
        }

        // открытие попап вход регистрация по иконке, по кнопке войти
        // if(e.target.closest('')) {
            // const resp = await this.restApi.profile.create(formData);

            // if(resp) {
            //     this.activeModal = await this.modals.getModal('account', 'success-edit-profile');
            // } else {
            //     this.activeModal = await this.modals.getModal('fail');
            // }

            // this.modals.showModal();
        // }

        // if(e.target.closest('')) {

        // }
    }
}