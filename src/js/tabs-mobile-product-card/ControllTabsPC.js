export default class ControllTabsPC {
    constructor(d, tabs) {
        this.d = d;
        this.tabs = tabs;

        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.click);
        })
    }

    click(e) {
        const target = e.target.closest('.product__tab-button_m');
        const isActive = target.classList.contains('product__tab-active');
        const el = target.nextElementSibling;

        if(isActive) {
            this.d.close(el, target);
            return;
        }
        
        this.d.open(el, target);
    }
}