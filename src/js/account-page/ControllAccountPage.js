export default class ControllAccountPage {
    constructor(redraws, validation, restApi, AirDatepicker, modals) {
        this.redraws = redraws;
        this.validation = validation;
        this.restApi = restApi;
        this.AirDatepicker = AirDatepicker;
        this.modals = modals;

        this.activeModal = null;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);

        this.handlerModalClick = this.handlerModalClick.bind(this);
    }

    init() {
        this.registerEvents();
        this.registerLibraries(); 
    }

    registerLibraries() {
        // календарь в профиле для даты рождения
        new this.AirDatepicker('.acc-user__birth-input', {
            isMobile : innerWidth <= 961 ? true : false,
            autoClose : true,
        })
    }

    registerEvents() {
        this.redraws.tabs.tabs.addEventListener('click', this.click);
        this.redraws.profile.screen.addEventListener('click', this.click);
        this.redraws.profile.requiredInputs.forEach(el => el.addEventListener('focus', this.focus));
    }

    click(e) {
        // TABS
        // переключение страничек (экранов) на странице
        if(e.target.closest('.account__ctrl-item')) {
            const target = e.target.closest('.account__ctrl-item');

            this.redraws.tabs.switchingTabs(target);
            this.redraws.tabs.switchingScreen(target.dataset.ctrl);
        }

        // PROFILE
        // разблокируем поля для редактирования
        if(e.target.closest('.acc-user__button-edit')) {
            this.redraws.profile.enableProfile();
        }
        // Редактируем профиль и сохраняем
        if(e.target.closest('.acc-user__button-save')) {
            // Валидация на заполненность
            const resultReqInputs 
                = this.validation.validationRequiredInputs(this.redraws.profile.requiredInputs);

            // Ставим ошибку что поле обязательно к заполнению на незаполненные поля
            if(resultReqInputs.length) {
                resultReqInputs.forEach(input => {
                    this.redraws.profile.setError(input, 'Поле обязательно для заполнения');
                });
            }
            // Если элемент email не найден значит он был заполнен и есть необходимость 
            // проверить на соответствие шаблону
            const elEmail = resultReqInputs.find(input => input.name === 'email');

            let resultEmail = true;
            if(!elEmail) {
                resultEmail = this.validation.validationEmail(this.redraws.profile.emailInputs);

                if(!resultEmail) {
                    this.redraws
                        .profile
                            .setError(this.redraws.profile.emailInputs, 'Некорректный email');
                }
            };
        
            // если есть ошибки при заполнении обязательных полей останавливаем
            if(Boolean(resultReqInputs.length) || !resultEmail) return;
            
            // если нет ошибок собираем данные и отправляем на сервер
            const formData = new FormData(this.redraws.profile.form);

            (async () => {
                const resp = await this.restApi.profile.create(formData);

                this.redraws.profile.disableProfile(); // блокируем поля

                if(resp) {
                    this.activeModal = await this.modals.getModal('account', 'success-edit-profile');
                } else {
                    this.activeModal = await this.modals.getModal('fail');
                }
    
                this.modals.showModal();
            })()
        }
        // Удаляем профиль
        if(e.target.closest('.acc-user__button-delete')) {
            this.modals.registerHandlerOnClick('click', this.handlerModalClick);

            (async () => {
                this.activeModal = await this.modals.getModal('account', 'delete-profile');
                this.modals.showModal();
            })()
        }
    }

    focus(e) {
        if(e.target.closest('input[required]') && !e.target.validity.valid) {
            this.redraws.profile.removeError(e.target.closest('input[required]'));
        }
    }

    // МЕТОДЫ ДЛЯ ПРОБРАСЫВАНИЯ В КЛАСС С МОДАЛКАМИ
    handlerModalClick(e) {
        // ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ АККАУНТА
        // удалить аккаунт
        if(e.target.closest('.dialog__button-send')) {
            (async () => {
                const resp = await this.restApi.profile.delete();
                this.modals.closeModal();

                if(resp) {
                    this.modals.registerHandlerOnClick('click', this.handlerModalClick);
                    this.activeModal = await this.modals.getModal('account', 'success-delete-profile');
                } else {
                    this.activeModal = await this.modals.getModal('fail');
                }

                this.modals.showModal();
            })()
        }
        // отменить удаление аккаунта
        if(e.target.closest('.dialog__button-cancel')) {
            this.modals.closeModal();
        }
        // ПОФИЛЬ УДАЛЕН УСПЕШНО
        // редирект при клике на кнопку на главную 
        if(e.target.closest('.dialog__button_redirect')) {
            location.href = '/';
        }
    }
    
}