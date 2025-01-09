export default class RedrawFilterPL {
    constructor(el, openButton) {
        this.el = el;
        this.openButton = openButton;
        console.log(openButton)
        this.points = [...this.el.querySelectorAll('input[type="checkbox"]')];
    }

    // FOR MOBILE показываем фильтры
    show() {
        this.el.classList.add('filters__active');
    }
    // FOR MOBILE скрываем фильтры
    hide() {
        this.el.classList.remove('filters__active');
    }

    // Разворачиваем список в категории фильтра
    openFilterList(target, list) {
        target.setAttribute('active', '');

        const childs = [...list.children];
        const height = childs.reduce((acc, item) => {
            return acc += item.offsetHeight
        }, 0);
        
        list.style.height = `${height}px`;
    }

    // Сворачиваем список в категории фильтра
    closeFilterList(target, list) {
        target.removeAttribute('active');

        const childs = [...list.children];
        
        list.style.height = `0px`;
    }
}