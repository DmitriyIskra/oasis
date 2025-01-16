export default class RedrawDescriptionProdCard {
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

        // КОМПЛЕКТАЦИИ
        // Блок кнопок переключения комплектаций
        this.tabsPackages = this.contentsForDesctop.querySelector('.package__tabs-list');
        this.contentPackeges = this.contentsForDesctop.querySelector('.package__content-list');
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

    switchingPackages(target) {
        // индекс выбранной комплектации
        const i = target.dataset.tab_item;
        // текущие активные наименование комплектации и контент
        const currentTab = this.tabsPackages.querySelector('.package__tabs-item_active');
        const currentContent = this.contentPackeges.querySelector('.package__content-item_active');

        currentTab.classList.remove('package__tabs-item_active');
        currentContent.classList.remove('package__content-item_active');

        target.classList.add('package__tabs-item_active');
        const selectedContent = this.contentPackeges.querySelector(`[data-content_item="${i}"]`);
        selectedContent.classList.add('package__content-item_active');
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

    /**
     * @description el - это блок с контентом который нужно закрыть
     * @description target - кнопка по которой произошел тап
     * */ 
    close(el, target) {
        el.style.height = 0;
        target.classList.remove('product__tab-active');

        // переключаем комплектацию в первую стартовую позицию
        if(this.tabsPackages) {
            setTimeout(() => {
                if(target.classList.contains('product__about-tab-button_m')) {
                    this.switchingPackages(this.tabsPackages.children[0]);
                }
            }, 300)
        }
    }
}