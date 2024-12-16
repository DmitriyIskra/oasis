export default function interestingSlider(modules, classes) {
    const {Swiper, Navigation} = modules;
    const [slider, prev, next] = classes;

    let swiper = null;
    let timeOutId = null;

    function initSlider() {
        if(innerWidth < 962) {
            initMobileSlider();
            return;
        } 

        initDesctopSlider();
    }

    function initMobileSlider() {
        swiper = new Swiper(slider, {
            modules: [Navigation],
    
            loop: true,
            speed: 300,
            spaceBetween: 12,
            slidesPerView: 2.33,
            allowTouchMove: true,
        })
    }

    function initDesctopSlider() {
        swiper = new Swiper(slider, {
            modules: [Navigation],
    
            loop: true,
            speed: 900,
            slidesPerView: 'auto',
            allowTouchMove: false,
            on: {
                init: function() {
                    if(this.slides.length > 5 && innerWidth > 961) {
                        this.params.centeredSlides = true;
                        this.params.centeredSlidesBounds = true;
                    }
                },
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        })
    }

    initSlider();

    window.addEventListener('resize', (e) => {
        clearTimeout(timeOutId);

        timeOutId = setTimeout(() => {
            swiper.destroy();
            initSlider();
        }, 50)
    })
}