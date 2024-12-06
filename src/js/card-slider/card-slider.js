export default function(modules, classes) {
    const {Swiper, Navigation, EffectFade, Thumbs} = modules;
    const [sGoods, sThumbs, thumbSlide, goodsPrev, goodsNext] = classes;

    const thumbEl = document.querySelector(sThumbs)
    const amountPerView = document.querySelectorAll(thumbSlide).length;
    const next = document.querySelector(goodsNext)
    const prev = document.querySelector(goodsPrev)

    // Кнопки управление
    const thumbs = new Swiper(sThumbs, {
        modules: [Navigation],
        slidesPerView: 3,
        loop: true,
        // watchOverflow: amountPerView === 1 ? true : false, 
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
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        navigation: {
            prevEl: goodsPrev,
            nextEl: goodsNext,
        },
        
        // thumbs: {
        //     swiper: thumbs,
        // },
        breakpoints: {
            // when window width is <= 961px && window width >= 320px 
            320: {
                allowTouchMove: true,
            },
            // when window width is >= 962px
            962: {
                allowTouchMove: true,
            }
        }
    })

    thumbEl.addEventListener('click', (e) => {
        if(e.target.closest(thumbSlide)) {
            const slide = e.target.closest(thumbSlide)
            const index = +slide.getAttribute('data-swiper-slide-index');
            console.log(index)
            goods.slideToLoop(index, 300)
            thumbs.slideToLoop(index, 300)
            // thumbs.slideReset(index, 300)
        }
    })

    next.addEventListener('click', () => {
        thumbs.slideNext(300)
    })
    prev.addEventListener('click', () => {
        thumbs.slidePrev(300)
    })
}