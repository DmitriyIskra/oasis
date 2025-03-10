export default class ControllBasket {
    constructor(redraw) {
        this.redraw = redraw;

        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.input = this.input.bind(this);
        this.resize = this.resize.bind(this);
    }

    init() {
        this.registerEvents();

    }
    
    registerEvents() { 
        window.addEventListener('resize', this.resize);

        this.redraw.el.addEventListener('click', this.click);

        this.redraw.inputsPhone.forEach(item => {
            item.addEventListener('focus', this.focus);
            item.addEventListener('blur', this.blur)
        });

        this.redraw.inputBalls.addEventListener('input', this.input);

        this.redraw.inputsZipCode.forEach(input => {
            input.addEventListener('input', this.input);
        })
    }
    click(e) {
        // переключение табов, разделено по двум разным блокам формы и товары
        // табы можно переключать и совсем выключать
        if(e.target.closest('.basket__tab')) {
            const tab = e.target.closest('.basket__tab');
            const parent = tab.parentElement;
            
            // определяет к какому блоку относится tab "способ доставки" или "способ оплаты"
            let typeTab;
            if(parent.classList.contains('basket__deliv-forms')) {
                typeTab = 'currentActiveTabD';
            };
            if(parent.classList.contains('basket__pay-forms')) {
                typeTab = 'currentActiveTabP';
            };

            // один из табов и форм активен и совпадает с крайним открытым 
            // т.е. выключает активный
            if(this.redraw[typeTab] && this.redraw[typeTab] === tab) {
                this.redraw.closeForm(parent.dataset.typeforms);
                this.redraw.offTab(parent, parent.dataset.typeforms);
                return;
            }
            // один из табов и форм активен и не совпадает с крайним открытым
            // т.е. переключаем с одного на другой
            if(this.redraw[typeTab] && this.redraw[typeTab] !== tab) {
                this.redraw.closeForm(parent.dataset.typeforms);
                this.redraw.offTab(parent, parent.dataset.typeforms);
                this.redraw.onTab(tab, parent.dataset.typeforms);
                this.redraw.openForm(parent.dataset.typeforms);
            }
            
            // включает таб и форму впервые
            if(!this.redraw[typeTab]) {
                this.redraw.onTab(tab, parent.dataset.typeforms);
                this.redraw.openForm(parent.dataset.typeforms);
            }
        }

        // переключае экранов в мобилке между списком товаров и формами
        if(e.target.closest('.place-order__button_mob') || e.target.closest('.basket__arrow-back')) {
            this.redraw.switchScreens();
        }

        // Отправка данных на сервер
        if(e.target.closest('.place-order__button')) {
            
        }
    }
    
    // При вводе данных в индекс или количество балов
    // разрешено ввести только цифры и указанное количество символов
    input(e) {
        if(e.target.closest('.basket__balls-deduct-input') || e.target.matches("input[name='zipcode']")) {
            this.redraw.onlyNum(e.target);
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

    resize(e) {
        // С мобилки на десктоп
        if(innerWidth > 961 && this.redraw.lastLoadWidth <= 961) {
            if(this.redraw.currentActiveTabD) {
                this.redraw.currentOpenFormD.style = ''
            }

            if(this.redraw.currentActiveTabP) {
                this.redraw.currentOpenFormP.style = ''
            }
        }

        // С десктоп на мобилку
        if(innerWidth <= 961 && this.redraw.lastLoadWidth > 961) {
            if(this.redraw.currentActiveTabD) {
                this.redraw.openForm('delivery');
            }

            if(this.redraw.currentActiveTabP) {
                this.redraw.openForm('payment');
            }
        }
        this.redraw.lastLoadWidth = innerWidth;
    }
}
