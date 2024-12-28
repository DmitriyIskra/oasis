export default class ControllFilterPL {
    constructor(redraw) {
        this.redraw = redraw;
        
        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.redraw.el.addEventListener('click', this.click);
    }

    click(e) {
        if(e.target.closest('.filter__title')) {
            const target = e.target.closest('.filter__title')
            const isOpened = target.hasAttribute('active')
            const list = target.nextElementSibling;

            if(!isOpened) this.redraw.open(target, list);
            if(isOpened) this.redraw.close(target, list);
        }
    }
}