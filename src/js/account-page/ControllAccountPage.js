export default class ControllAccountPage {
    constructor(redraws, validation, restApi, AirDatepicker, modals, handlers) {
        this.redraws = redraws;
        this.validation = validation;
        this.restApi = restApi;
        this.AirDatepicker = AirDatepicker; 
        this.modals = modals;
        this.handlers = handlers; // методы для регистрации к модальным окнам

        this.activeModal = null;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
        this.input = this.input.bind(this);

        this.activeHandler = null;
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
        
        this.redraws.address.screen.addEventListener('click', this.click);
        this.redraws.address.screen.addEventListener('input', this.input);
        this.redraws.address.screen.addEventListener('paste', this.paste);
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
        // разблокирование полей для редактирования
        if(e.target.closest('.acc-user__button-edit')) {
            this.redraws.profile.enableProfile();
        }
        // Редактирование профиля и сохранение
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
            // Прорверяем есть ли поле email среди не заполненных полей
            // Если элемент email не найден значит он был заполнен и есть необходимость 
            // проверить на соответствие шаблону
            const elEmail = resultReqInputs.find(input => input.name === 'email');

            let resultEmail = true;
            if(!elEmail) {
                resultEmail = this.validation.validationEmail(this.redraws.profile.emailInputs.value);

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

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                const resp = await this.restApi.profile.update(formData);

                this.redraws.profile.disableProfile(); // блокируем поля

                if(resp) {
                    this.activeModal = await this.modals.getModal('account', 'success-edit-profile');
                } else {
                    this.activeModal = await this.modals.getModal('fail');
                }
    
                this.modals.showModal();
            })()
        }

        // Удаление профиля
        if(e.target.closest('.acc-user__button-delete')) {
            // прикрепляем контекст
            this.activeHandler = this.handlers.deleteAcc.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            (async () => {
                this.activeModal = await this.modals.getModal('account', 'delete-profile');
                this.modals.showModal(); 
            })()
        }
    }

    input(e) {
        if(e.target.closest('.acc-user__zipcode')) {
            this.redraws.address.maxSize(e.target, 6);
            this.redraws.address.onlyNum(e.target)
        }
    }

    focus(e) {
        // снимает невалидность с элемента
        if(e.target.closest('input[required]') && !e.target.validity.valid) {
            this.redraws.profile.removeError(e.target.closest('input[required]'));
        }
    }

    
    
}