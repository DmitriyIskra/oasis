export default class ControllAccountPage {
    constructor(redraw, AirDatepicker) {
        this.redraw = redraw;
        this.AirDatepicker = AirDatepicker;
        
        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
        this.registerLibraries();
    }

    registerLibraries() {
        new this.AirDatepicker('.acc-user__birth-input', {
            isMobile : innerWidth <= 961 ? true : false,
            autoClose : true,
        })
    }

    registerEvents() {
        this.redraw.ctrl.addEventListener('click', this.click);
    }

    click(e) {
        // переключение страничек (экранов) на странице
        if(e.target.closest('.account__ctrl-item')) {
            const target = e.target.closest('.account__ctrl-item');

            this.redraw.switchingCtrl(target);
            this.redraw.switchingScreen(target.dataset.ctrl);
        }
    }
}