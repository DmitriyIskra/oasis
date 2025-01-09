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
        this.redraw.openButton.addEventListener('click', this.click);
    }

    click(e) {
        // Сворачиваем и разворачиваем список фильтров
        if(e.target.closest('.filter__title')) {
            const target = e.target.closest('.filter__title')
            const isOpened = target.hasAttribute('active')
            const list = target.nextElementSibling;

            if(!isOpened) this.redraw.openFilterList(target, list);
            if(isOpened) this.redraw.closeFilterList(target, list);
        }

        // FOR MOBILE показываем фильтры
        if(e.target.closest('.sku__open-filter_mob')) {
            console.log('show')
            this.redraw.show();
        }
        // FOR MOBILE скрываем фильтры
        if(e.target.closest('.filters__close-filter_mob')) {
            console.log('hide')
            this.redraw.hide();
        }
    }
}