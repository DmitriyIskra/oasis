export default class ControllAccountPage {
    constructor(redraws, validation, AirDatepicker, modals) {
        this.redraws = redraws;
        this.validation = validation;
        this.AirDatepicker = AirDatepicker;
        this.modals = modals;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
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
        if(e.target.closest('.acc-user__button-edit')) {
            this.redraws.profile.enableProfile();
        }
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
            (this.redraws.profile.form)

            // блокируем поля
            this.redraws.profile.disableProfile(); // блокируем поля

            (async () => {
                const modal = await this.modals.getModal('account', 'success-edit-profile');
                document.body.style.overflow = 'hidden';
                modal.showModal();
            })()
        }
    }

    focus(e) {
        if(e.target.closest('input[required]') && !e.target.validity.valid) {
            this.redraws.profile.removeError(e.target.closest('input[required]'));
        }
    }
    
}