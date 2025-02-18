export default class ControllMenuAccount {
    constructor(redraw) {
        this.redraw = redraw;
        
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.redraw.el.addEventListener('mousemove', this.mouseMove);
        this.redraw.el.addEventListener('mouseout', this.mouseOut);
    }

    mouseMove(e) {
        if(e.target.closest('.header__account-icon')) {
            this.redraw.open();
        }
    }

    mouseOut(e) {
        if(e.relatedTarget && (e.relatedTarget.closest('main') || 
        e.relatedTarget.closest('.header__wr-favourite-icon') ||
        e.target.closest('.header__wr-basket-icon'))) {
            this.redraw.close();
        }
    }
}