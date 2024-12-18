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
        this.d.zoom.addEventListener('click', this.click);
        window.addEventListener('resize', this.resize);
    }

    click(e) {
        // Перелистывание основного слайда, по клику на слайд в thumbs
        if(e.target.closest(this.d.classes.thumbSlide)) {
            // слайд по которому случился клик
            const slide = e.target.closest(this.d.classes.thumbSlide);

            // если слайдов больше трех и клик по уже активному слайду блокируем
            if(slide.classList.contains('swiper-slide-active') &&
            this.d.mainSlides.length > 3) return;

            // Прокручмваем слайдер
            // индекс слайда по которому случился клик
            const index = +slide.getAttribute('data-swiper-slide-index');
            // Прокручиваем слайд на слайдере
            this.d.instanceSlider.slideToLoop(index, this.d.speed);
            
            // Если слайдов мало, превью не крутим
            if(this.d.mainSlides.length <= 3) return;
            // Прокручиваем thumbs
            // предыдущий слайд от того по которому произошел клик
            const prevSlide = slide.previousElementSibling;
            // является ли предыдущий слайд слайдом next
            const prevSlideIsNext = prevSlide && prevSlide.classList.contains('swiper-slide-next');

            // Прокручиваем слайд на thumbs
            this.d.instanceThumbs.slideNext(this.d.speed);
            if(prevSlideIsNext) {
                this.d.thumbSlidesWrapper.addEventListener('transitionend', () => {
                    this.d.instanceThumbs.slideNext(this.d.speed);
                }, {once: true})
            }
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

        // ZOOM
        // open
        if(e.target.closest(this.d.classes.mainSlide)) {
            const img = e.target.closest('img');
            const path = img.src;
            const data = img.getBoundingClientRect()

            this.d.openZoom(path, data);
        }

        // close
        if(e.target.closest(this.d.classes.closeZoom) ||
        e.target.closest(this.d.classes.zoom)) {
            this.d.closeZoom();
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