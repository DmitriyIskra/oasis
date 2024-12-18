export default class RedrawCaredSlider {
    constructor(slider, modules, classes) {
        this.slider = slider;
        this.modules = modules;
        this.classes = classes;

        // Слайдер с thumbs
        this.thumbSlider = this.slider.querySelector(this.classes.thumbsSlider);
        // Контейнер над слайдами для thumbs
        this.thumbSlidesWrapper = this.slider.querySelector('.product__thumbs-wrapper');

        // Слайды слайдера
        this.mainSlides = this.slider.querySelectorAll(this.classes.mainSlide);

        // Стрелки
        this.next = this.slider.querySelector(this.classes.next);
        this.prev = this.slider.querySelector(this.classes.prev);
        this.arrows = [this.next, this.prev];
        this.arrowsM = [
            this.slider.querySelector(this.classes.next_m),
            this.prev = this.slider.querySelector(this.classes.prev_m),
        ]

        this.zoom = document.querySelector(this.classes.zoom);
        this.zoomWrImage = this.zoom.children[0];
        this.zoomImage = this.zoomWrImage.children[0];

        this.instanceThumbs = null;
        this.instanceSlider = null;

        // Скорость перелистывания
        this.speed = 300;
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

    openZoom(path, data) {
        this.zoom.classList.add(this.classes.zoomActive);
        this.zoomWrImage.style.height = `${data.height}px`;
        this.zoomWrImage.style.width = `${data.width}px`;
        this.zoomWrImage.style.top = `${data.y}px`;
        this.zoomWrImage.style.left = `${data.x}px`;
        this.zoomImage.src = path;

        this.zoom.addEventListener('transitionend', () => {
            this.zoomWrImage.classList.add(this.classes.zoomImgActive);
        }, {once: true})
    }

    closeZoom() {
        this.zoom.classList.remove(this.classes.zoomActive);
        this.zoom.addEventListener('transitionend', () => {
            this.zoomWrImage.style = '';
            this.zoomWrImage.classList.remove(this.classes.zoomImgActive);
            this.zoomImage.src = '#0';
        }, {once: true})
    }
}