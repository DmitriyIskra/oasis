export default class ControllTabsPC {
    constructor(redraw) {
        this.redraw = redraw;

        this.click = this.click.bind(this);
        this.resize = this.resize.bind(this);

        this.timeOutId = null;
    }

    init() { 
        this.registerEvents();
    }

    registerEvents() {
        this.redraw.buttonsMobile.forEach(item => item.addEventListener('click', this.click));
        this.redraw.buttonsDesctop.forEach(item => item.addEventListener('click', this.click));
        window.addEventListener('resize', this.resize);
    }

    click(e) {
        // Разворачивание контента в мобильной версии
        if(e.target.closest('.product__tab-button_m')) {
            const target = e.target.closest('.product__tab-button_m');
            const isActive = target.classList.contains('product__tab-active');
            const el = target.nextElementSibling;

            if(isActive) {
                this.redraw.close(el, target);
                return;
            }
            
            this.redraw.open(el, target);
        }

        // Переключение контента в десктопной версии
        if(e.target.closest('.product-desc__button')) {
            const target = e.target.closest('.product-desc__button');
            
            this.redraw.switching(target);
        }
    }

    resize() {
        if(this.timeOutId) clearTimeout(this.timeOutId);

        this.timeOutId = setTimeout(() => {
            this.redraw.reset();
        }, 100)
    }
}