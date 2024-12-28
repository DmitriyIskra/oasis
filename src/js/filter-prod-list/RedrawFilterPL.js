export default class RedrawFilterPL {
    constructor(el) {
        this.el = el;

        this.points = [...this.el.querySelectorAll('input[type="checkbox"]')];
    }

    open(target, list) {
        target.setAttribute('active', '');

        const childs = [...list.children];
        const height = childs.reduce((acc, item) => {
            return acc += item.offsetHeight
        }, 0);
        
        list.style.height = `${height}px`;
    }

    close(target, list) {
        target.removeAttribute('active');

        const childs = [...list.children];
        
        list.style.height = `0px`;
    }
}