export default class RedrawMenuAccount {
    constructor(el) {
        this.el = el;
        this.menu = this.el.querySelector('.header__acc-menu');
        
        this.isOpen = false;
    }

    open() {
        if(!this.isOpen) {
            this.menu.classList.add('header__acc-menu_active')
            this.isOpen = true;
        };
    }

    close() {
        if(this.isOpen) {
            this.menu.classList.remove('header__acc-menu_active')
            this.isOpen = false;
        };
    }
}