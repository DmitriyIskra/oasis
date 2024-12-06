export default function salesHitsSlider(modules, classes, fewSliders) {
    const {Swiper, Autoplay, EffectFade, Thumbs, Grid} = modules;
    const [sThumbs, sGoods] = classes;

    // Кнопки управление
    const thumbs = new Swiper(sThumbs, {
        slidesPerView: 10,
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
        allowTouchMove: false,
        thumbs: {
            swiper: thumbs,
        },
        autoplay: {
            delay: 2500
        }
    })

    /** 
     * Все что ниже служит для адаптации слайдера при переходе breakpoints
     * */ 
    // Слайдеры непосредственно с карточками товаров
    const swipers = [];

    // Инициализация swiper desctop
    function initSwiperDesctop() {
        if(swipers.length) swipers.length = 0;

        fewSliders.forEach(item => {
            const s = new Swiper(item, {
                modules: [Grid],
                slidesPerView: 4,
                allowTouchMove: false,
                centeredSlides: false,
                spaceBetween: 0,
                grid: {
                    fill: 'row',
                    rows: '2'
                }
            })

            swipers.push(s);
        });
    }

    // Инициализация swiper mobile
    function initSwiperMobile() {
        if(swipers.length) swipers.length = 0;

        fewSliders.forEach(item => {
            const s = new Swiper(item, {
                loop: true,
                allowTouchMove: true,
                centeredSlides: true,
                slidesPerView: 1.22, // 1.22
                spaceBetween: 8,
            })
    
            swipers.push(s);
        });
    }

    // Первая инициализация (загрузка страницы)
    if(innerWidth > 961) initSwiperDesctop();

    if(innerWidth <= 961) initSwiperMobile();
    

    // Переиницализация
    window.addEventListener('resize', () => {
        if(innerWidth > 961 && swipers.length) {
            swipers.forEach(sw => sw.destroy());
            initSwiperDesctop();
            return;
        }

        swipers.forEach(sw => sw.destroy());
        initSwiperMobile();
    })
}