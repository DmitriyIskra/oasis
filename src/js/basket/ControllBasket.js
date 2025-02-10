export default class ControllBasket {
    constructor(redraw) {
        this.redraw = redraw;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.input = this.input.bind(this);
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
    }

    click(e) {
        // переключение табов, разделено по двум разным блокам формы и товары
        // табы можно переключать и совсем выключать
        if(e.target.closest('.basket__tab')) {
            const tab = e.target.closest('.basket__tab');
            const parent = tab.parentElement;

            let typeTab;
            if(parent.classList.contains('basket__deliv-forms')) {
                typeTab = 'currentActiveTabD';
            };
            if(parent.classList.contains('basket__pay-forms')) {
                typeTab = 'currentActiveTabP';
            };


            if(this.redraw[typeTab] && this.redraw[typeTab] === tab) {
                this.redraw.offTab(parent, parent.dataset.typeforms);
                return;
            }

            if(this.redraw[typeTab] && this.redraw[typeTab] !== tab) {
                this.redraw.offTab(parent, parent.dataset.typeforms);
                this.redraw.onTab(tab, parent.dataset.typeforms);
            }
            
            if(!this.redraw[typeTab]) {
                this.redraw.onTab(tab, parent.dataset.typeforms);
                this.redraw.openForm(parent.dataset.typeforms)
            }
        }

        // переключае экранов в мобилке между списком товаров и формами
        if(e.target.closest('.place-order__button_mob') || e.target.closest('.basket__arrow-back')) {
            this.redraw.switchScreens();
        }
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