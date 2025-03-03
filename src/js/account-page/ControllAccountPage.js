export default class ControllAccountPage {
    constructor(redraws, validation, AirDatepicker) {
        this.redraws = redraws;
        this.validation = validation;
        this.AirDatepicker = AirDatepicker;
        
        this.click = this.click.bind(this);
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
        this.redraws.profile.screensWrapper.addEventListener('click', this.click);
    }

    click(e) {
        // переключение страничек (экранов) на странице
        if(e.target.closest('.account__ctrl-item')) {
            const target = e.target.closest('.account__ctrl-item');

            this.redraws.tabs.switchingTabs(target);
            this.redraws.tabs.switchingScreen(target.dataset.ctrl);
        }

        // ПРОФИЛЬ
        if(e.target.closest('.acc-user__button-edit')) {
            this.redraws.profile.enableProfile();
        }
        if(e.target.closest('.acc-user__button-save')) {
            // Валидация на заполненность


            this.redraws.profile.disableProfile();
        }
    }

    
}