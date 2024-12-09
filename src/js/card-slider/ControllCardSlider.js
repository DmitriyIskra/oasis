export default class ControllCardSlider {
    constructor(d) {
        this.d = d;
    
        let timeOutID = null;

        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
        this.d.initSliders()
    }

    registerEvents() {
        this.d.slider.addEventListener('click', this.click);
    }

    click(e) {
        // Перелистывание слайда, по клику на слайд в thumbs
        if(e.target.closest(this.d.classes.thumbSlide)) {
            const slide = e.target.closest(this.d.classes.thumbSlide);
            const index = +slide.getAttribute('data-swiper-slide-index');

            this.d.instanceSlider.slideToLoop(index, this.d.speed)
            this.d.instanceThumbs.slideToLoop(index, this.d.speed)
        }

        // События клика по элеметам управления
        if(e.target.closest(this.d.classes.prev)) {
            if(this.timeOutID) return;
        
            this.d.instanceThumbs.slidePrev(this.d.speed); // next slide for thumbs
            this.d.blockArrow(e.target);
            
            setTimeout(() => {
                this.d.unBlockArrow(e.target);
                clearTimeout(this.timeOutID);
            }, this.d.speed + 50)
        }
        if(e.target.closest(this.d.classes.next)) {
            if(this.timeOutID) return;

            this.d.instanceThumbs.slideNext(this.d.speed); // next slide for thumbs
            this.d.blockArrow(e.target);
            
            setTimeout(() => {
                this.d.unBlockArrow(e.target);
                clearTimeout(this.timeOutID);
            }, this.d.speed + 50)
        }
    }
}