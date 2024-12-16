export default class RedrawTabsPC {
    constructor() {
        
    }

    open(el, target) {
        const childs = [...el.children];
        let height = 0;
        
        childs.forEach(child => {
            height += child.clientHeight
        });
        el.style.height = `${height}px`;

        // el.addEventListener('transitionend', () => {
        //     const padTop =  parseFloat(getComputedStyle(el).paddingTop);
        //     const padBottom = parseFloat(getComputedStyle(el).paddingBottom);
        //     const gap = parseFloat(getComputedStyle(el).gap);
        //     el.style.height = `${height + padTop + padBottom + gap}px`;
        // }, {once: true})

        target.classList.add('product__tab-active');
    }

    close(el, target) {
        el.style.height = 0;
        target.classList.remove('product__tab-active');
    }
}