export default class ControllCardSlider {
    constructor(d) {
        this.d = d;
    
        this.timeOutID = null;
        this.timeOutResizeID = null;

        this.click = this.click.bind(this);
        this.resize = this.resize.bind(this);
    }

    init() {
        this.registerEvents();
        this.d.initSliders()
    }

    registerEvents() {
        this.d.slider.addEventListener('click', this.click);
        window.addEventListener('resize', this.resize);
    }

    click(e) {
        // Перелистывание слайда, по клику на слайд в thumbs
        if(e.target.closest(this.d.classes.thumbSlide)) {
            const slide = e.target.closest(this.d.classes.thumbSlide);
            const index = +slide.getAttribute('data-swiper-slide-index');

            this.d.instanceSlider.slideToLoop(index, this.d.speed);
            this.d.instanceThumbs.slideToLoop(index, this.d.speed);
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

    resize(e) {
        this.d.lastSize = innerWidth;
        if(this.timeOutResizeID) clearTimeout(this.timeOutResizeID);
        
        this.timeOutResizeID = setTimeout(() => {
            try {
                this.d.instanceSlider.destroy();

                // было mobile, стало desctop
                if(this.d.lastSize > 961) {
                    this.d.initSlider();
                    this.d.initThumbs();

                    return;
                }

                // // было desctop, стало mobile
                this.d.instanceThumbs.destroy();
                this.d.initSlider();
            } catch (error) {
                location.reload();
            }
            
        }, 50)
        
    }
}