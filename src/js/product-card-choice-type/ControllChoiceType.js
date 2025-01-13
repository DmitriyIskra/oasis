export default class ControllChoiceType {
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
        if(e.target.closest('.characteristics__types-item')) {
            const target = e.target.closest('.characteristics__types-item');
            const parent = target.parentElement;
            const current = parent.querySelector('.characteristics__types-item_active');

            this.redraw.removeActive(current);
            this.redraw.setActive(target);

        }
    }
}