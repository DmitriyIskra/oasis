export default class RedrawTabsPC {
    constructor() {
         // кнопки для переключения в mobile
        this.buttonsMobile = [...document.querySelectorAll('.product__tab-button_m')];
         // кнопки для переключения в desctop
        this.buttonsDesctop = [...document.querySelectorAll('.product-desc__button')];
         // содержимое (контент)
        this.contentsForDesctop = document.querySelector('.product-desc__wr-content');
         // содержимое для mobile (контент)
        this.contentForMobile = [...document.querySelectorAll('.product-desc__content_mob')];
    
        // активная кнопка tab для desctop
        this.activeDescButton = this.buttonsDesctop
            .find(item => item.classList.contains('product-desc__button_active'));
        // активный контент для desctop
        this.activeContent = this.contentsForDesctop.querySelector('.product-desc__content_active');
    }

    reset() {            
        this.switching(this.buttonsDesctop[0]);

        // с мобилки на десктоп
        if(innerWidth > 961) {

            this.contentForMobile.forEach(item => {
                if(item.hasAttribute('style')) {
                    item.removeAttribute('style');
                }
            })

            this.buttonsMobile.forEach(item => {
                if(item.classList.contains('product__tab-active')) {
                    item.classList.remove('product__tab-active')
                }
            })
        }
    }

    // DESCTOP VER.
    switching(target) {
        // подсветка активной кнопки
        this.activeDescButton.classList.remove('product-desc__button_active');
        this.activeDescButton = target;
        this.activeDescButton.classList.add('product-desc__button_active');
        
        // смена контента
        const index = target.dataset.index;

        this.activeContent.classList.remove('product-desc__content_active');

        const newActiveEl = this.contentsForDesctop.querySelector(`[data-index="${index}"]`);

        this.activeContent = newActiveEl;
        this.activeContent.classList.add('product-desc__content_active');
    }


    // MOBILE VER.
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