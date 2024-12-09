export default function(modules, classes) {
    const {Swiper, Navigation, EffectFade, Thumbs} = modules;
    const [sGoods, sThumbs, thumbSlide, goodsPrev, goodsNext] = classes;

    const thumbEl = document.querySelector(sThumbs);
    const next = document.querySelector(goodsNext);
    const prev = document.querySelector(goodsPrev);

    // Скорость перелистывания
    const speed = 300;

    // Кнопки управление
    const thumbs = new Swiper(sThumbs, {
        modules: [Navigation],
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true, watchSlidesProgress: true,
        loop: true,
        speed: speed,
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
    const goods = new Swiper(sGoods, {
        modules: [EffectFade, Thumbs, Navigation],
        effect: 'fade',
        slidesPerView: 1,
        loop: true,
        speed: speed,
        navigation: {
            prevEl: goodsPrev,
            nextEl: goodsNext,
        },
        breakpoints: {
            // when window width is <= 961px && window width >= 320px 
            320: {
                thumbs: {
                    swiper: thumbs,
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

    
    let timeOutID = null;

    // Перелистывание слайда, по клику на слайд в thumbs
    thumbEl.addEventListener('click', (e) => {
        if(e.target.closest(thumbSlide)) {
            const slide = e.target.closest(thumbSlide)
            const index = +slide.getAttribute('data-swiper-slide-index');

            goods.slideToLoop(index, speed)
            thumbs.slideToLoop(index, speed)
        }
    })

    // Блокировка и разблокировка элементов управления
    const blockArrow = (el) => el.style.pointerEvents = 'none';
    const unBlockArrow = (el) => el.style.pointerEvents = 'initial';


    // События клика по элеметам управления
    next.addEventListener('click', (e) => {
        if(timeOutID) return;

        thumbs.slideNext(this.d.speed); // next slide for thumbs
        blockArrow(e.target);
        
        setTimeout(() => {
            unBlockArrow(e.target);
            clearTimeout(timeOutID);
        }, this.d.speed + 50)
    })
    prev.addEventListener('click', (e) => {
        if(timeOutID) return;
        
        thumbs.slidePrev(this.d.speed); // next slide for thumbs
        blockArrow(e.target);
        
        setTimeout(() => {
            unBlockArrow(e.target);
            clearTimeout(timeOutID);
        }, this.d.speed + 50)
    })
}