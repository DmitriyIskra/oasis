export default class ControllBasket {
    constructor(redraw) {
        this.redraw = redraw;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.input = this.input.bind(this);
        this.keydown = this.keydown.bind(this);
    }

    init() {
        this.registerEvents();

    }
    
    registerEvents() {
        this.redraw.el.addEventListener('click', this.click);

        this.redraw.inputsPhone.forEach(item => {
            item.addEventListener('focus', this.focus);
            item.addEventListener('blur', this.blur)
        });

        this.redraw.inputBalls.addEventListener('input', this.input);
        this.redraw.inputBalls.addEventListener('keyup', this.keydown);
    }

    click(e) {
        if(e.target.closest('.basket__tab')) {
            const tab = e.target.closest('.basket__tab');
            const parrentOfTab = e.target.closest('.basket__grid-forms-list');

            this.redraw.offTab(parrentOfTab);
            this.redraw.onTab(tab);
        }

        // переключае экранов в мобилке между списком товаров и формами
        if(e.target.closest('.place-order__button_mob') || e.target.closest('.basket__arrow-back')) {
            this.redraw.switchScreens();
        }
    }

    keydown(e) {
    }
    
    input(e) {
        if(e.target.closest('.basket__balls-deduct-input')) {
            this.redraw.onlyNum(e.target, e.key);
            this.redraw.maxSize(e.target, 6);
        }
    }

    focus(e) {
        // для телефонов, маску назначаем
        if(e.target.closest('input[name="phone"]') || e.target.closest('input[name="additional-phone"]')) {
            this.redraw.setPhoneImask(e.target);
        }
    }

    blur(e) {
        // для телефонов, если пользователь ничего не ввел, маску убираем
        if(e.target.closest('input[name="phone"]') || e.target.closest('input[name="additional-phone"]')) {
            this.redraw.removePhoneImask(e.target);
        }
    }
}