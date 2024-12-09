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
    }

    initSliders() {
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

        // Карточки соответственно кнопкам управления
        // внутри каждой свой слайдер с товарами
        this.instanceSlider = new this.modules.Swiper(this.classes.mainSlider, {
            modules: [
                this.modules.EffectFade, this.modules.Thumbs, this.modules.Navigation,
            ],
            effect: 'fade',
            slidesPerView: 1,
            loop: true,
            speed: this.speed,
            navigation: {
                prevEl: this.classes.prev,
                nextEl: this.classes.next,
            },
            breakpoints: {
                // when window width is <= 961px && window width >= 320px 
                320: {
                    thumbs: {
                        swiper: this.instanceThumbs,
                    },
                    allowTouchMove: false,
                },
                // when window width is >= 962px
                962: {
                    thumbs: {
                        swiper: null,
                    },
                    allowTouchMove: false,
                }
            }
        })

        if(this.mainSlides.length === 1) this.hideThumbs();
    }

    // Блокировка и разблокировка элементов управления
    blockArrow(el) {el.style.pointerEvents = 'none';}
    unBlockArrow(el) {el.style.pointerEvents = 'initial';}

    hideThumbs() {
        console.log(this.thumbSlider)
        this.instanceThumbs.destroy();
        this.thumbSlider.style.display = "none";
    }
}