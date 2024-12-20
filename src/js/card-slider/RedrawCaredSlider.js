export default class RedrawCaredSlider {
    constructor(slider, zoom, modules, classes) {
        this.slider = slider;
        this.zoom = zoom;
        this.modules = modules;
        this.classes = classes;

        // Слайдер с thumbs
        this.thumbSlider = this.slider.querySelector(this.classes.thumbsSlider);
        // Контейнер над слайдами для thumbs
        this.thumbSlidesWrapper = this.slider.querySelector('.product__thumbs-wrapper');

        // Слайды слайдера
        this.mainSlides = [...this.slider.querySelectorAll(this.classes.mainSlide)]; 
        this.mainSlidesImges = [...this.slider.querySelectorAll(`${this.classes.mainSlide} > img`)]; 

        // Стрелки
        this.next = this.slider.querySelector(this.classes.next);
        this.prev = this.slider.querySelector(this.classes.prev);
        this.arrows = [this.next, this.prev];
        this.arrowsM = [
            this.slider.querySelector(this.classes.next_m),
            this.prev = this.slider.querySelector(this.classes.prev_m),
        ]

        this.zoomSlidesWrapper = this.zoom.querySelector('.product__zoom-wr-swiper');

        this.instanceThumbs = null;
        this.instanceSlider = null;
        this.instanceZoom = null;

        // Скорость перелистывания
        this.speed = 300;
        this.lastSize = innerWidth;
    }

    initSliders() {
        if(this.lastSize > 961) {
            this.initThumbs();
        }
        
        this.initSlider();
        this.initZoom();
    }

    initSlider() { 
        // Карточки соответственно кнопкам управления
        // внутри каждой свой слайдер с товарами
        this.instanceSlider = new this.modules.Swiper(this.classes.mainSlider, {
            modules: [
                this.modules.EffectFade, this.modules.Thumbs, this.modules.Navigation,
            ],
            effect: innerWidth < 962 ? 'slide' : 'fade',
            slidesPerView: 1,
            loop: true,
            speed: this.speed,
            navigation: {
                prevEl: innerWidth < 962 ? this.classes.prev_m : this.classes.prev,
                nextEl: innerWidth < 962 ? this.classes.next_m : this.classes.next,
            },
            breakpoints: {
                // when window width is <= 961px && window width >= 320px 
                320: {
                    allowTouchMove: true,
                    spaceBetween: 10,
                },
                // when window width is >= 962px
                962: {
                    allowTouchMove: false,
                    spaceBetween: 0,
                }
            }
        })

        if(this.mainSlides.length <= 3) this.hideArrows();
        if(this.mainSlides.length === 1) this.hideThumbs();
    }

    initThumbs() {
        // Кнопки управление
        this.instanceThumbs = new this.modules.Swiper(this.classes.thumbsSlider, {
            modules: [this.modules.Navigation],
            slidesPerView: this.mainSlides.length >= 3 ? 3 : 'auto',
            // slidesPerView: this.mainSlides.length > 3 ? 3 : this.mainSlides.length === 3 ? 2 : 1,
            spaceBetween: 10,
            freeMode: true, 
            watchSlidesProgress: true,
            loop: true,
            speed: this.speed,
            breakpoints: {
                // when window width is <= 961px && window width >= 320px 
                320: {
                    allowTouchMove: true,
                },
                // when window width is >= 962px
                962: {
                    allowTouchMove: false,
                }
            }
        })

        if(this.mainSlides.length < 3) {
            [...this.thumbSlidesWrapper.children].forEach(slide => {
                console.log(slide)
                slide.style.width = `${7.55}vw`;
            })
        }
    }

    initZoom() {
        this.instanceZoom = new this.modules.Swiper(this.classes.zoomSlider, {
            modules: [this.modules.Navigation, this.modules.Virtual],
            loop: true,
            slidesPerView: 1,
            speed: this.speed,
            navigation: {
                prevEl: this.classes.zoomPrev,
                nextEl: this.classes.zoomNext,
            }
        })
    }

    // Блокировка и разблокировка элементов управления
    blockArrow(el) {el.style.pointerEvents = 'none';}
    unBlockArrow(el) {el.style.pointerEvents = 'initial';}

    hideThumbs() {
        if(this.instanceThumbs) this.instanceThumbs.destroy();
        this.thumbSlider.style.display = "none";
    }

    hideArrows() {
        this.arrows.forEach(arrow => arrow.style.display = 'none');
        this.arrowsM.forEach(arrow => arrow.style.display = 'none');
    }

    openZoom() {
        this.zoom.classList.add(this.classes.zoomActive);
    }

    closeZoom() {
        this.zoom.classList.remove(this.classes.zoomActive);
    }
}