export default class RedrawCaredSlider {
    constructor(slider, modules, classes) {
        this.slider = slider;
        this.modules = modules;
        this.classes = classes;

        // Слайдер с thumbs
        this.thumbSlider = this.slider.querySelector(this.classes.thumbsSlider);

        // Слайды слайдера
        this.mainSlides = this.slider.querySelectorAll(this.classes.mainSlide);

        // Стрелки
        this.next = this.slider.querySelector(this.classes.next);
        this.prev = this.slider.querySelector(this.classes.prev);

        this.instanceThumbs = null;
        this.instanceSlider = null;

        // Скорость перелистывания
        this.speed = 700;
        this.lastSize = innerWidth;
    }

    initSliders() {
        if(this.lastSize > 961) {
            this.initThumbs();
        }
        
        this.initSlider();
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
                    // thumbs: {
                    //     swiper: this.instanceThumbs,
                    // },
                    allowTouchMove: true,
                    spaceBetween: 10,
                },
                // when window width is >= 962px
                962: {
                    // effect: 'fade',
                    thumbs: {
                        swiper: null,
                    },
                    allowTouchMove: false,
                    spaceBetween: 0,
                }
            }
        })

        if(this.mainSlides.length === 1) this.hideThumbs();
    }

    initThumbs() {
        // Кнопки управление
        this.instanceThumbs = new this.modules.Swiper(this.classes.thumbsSlider, {
            modules: [this.modules.Navigation],
            slidesPerView: 3,
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
    }

    // Блокировка и разблокировка элементов управления
    blockArrow(el) {el.style.pointerEvents = 'none';}
    unBlockArrow(el) {el.style.pointerEvents = 'initial';}

    hideThumbs() {
        if(this.instanceThumbs) this.instanceThumbs.destroy();
        this.thumbSlider.style.display = "none";
    }
}