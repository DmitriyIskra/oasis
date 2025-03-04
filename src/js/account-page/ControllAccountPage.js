export default class ControllAccountPage {
    constructor(redraws, validation, AirDatepicker, respModals) {
        this.redraws = redraws;
        this.validation = validation;
        this.AirDatepicker = AirDatepicker;
        
        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
        this.registerLibraries(); 
        console.log(window.dialogContr)
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
            
            // СОГЛАСИЕ НА ОБРАБОТКУ НУЖНО ЛИ ДАВАТЬ ВОЗМОЖНОСТЬ РЕДАКТИРОВАТЬ
            // И БЛОКИРОВАТЬ ЛИ СОХРАНЕНИЕ БЕЗ ВЫБРАННОГО ЧЕКБОКСА

            if(Boolean(resultReqInputs.length) || !resultEmail) return;
            this.redraws.profile.disableProfile();

            // const modal = this.read('account', 'success-edit-profile');
        }
    }

    
}