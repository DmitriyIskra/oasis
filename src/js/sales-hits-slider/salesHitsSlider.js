export default function salesHitsSlider(modules, classes) {
    const {Swiper, Autoplay, EffectFade, Thumbs, Grid} = modules;
    const [sThumbs, sGoods, sSub] = classes;

    // Кнопки управление
    const thumbs = new Swiper(sThumbs, {
        slidesPerView: 10,
        loop: true,
        allowTouchMove: false,
        breakpoints: {
            // when window width is <= 961px && window width >= 320px 
            320: {
                direction: 'vertical',
            },
            // when window width is >= 962px
            962: {
                direction: 'horizontal',
            }
        }
    })

    // Карточки соответственно кнопкам управления
    // внутри каждой свой слайдер с товарами
    const goods = new Swiper(sGoods, {
        modules: [EffectFade, Thumbs, Autoplay],
        effect: 'fade',
        speed: 1000,
        thumbs: {
            swiper: thumbs,
        },
        // autoplay: {
        //     delay: 2500
        // }
    })

    // Слайдеры непосредственно с карточками товаров
    new Swiper(sSub, {
        modules: [Grid],
        slidesPerView: 4,
        grid: {
            fill: 'row',
            rows: '2'
        },
    })
}