export default function interestingSlider(modules, classes) {
    const {Swiper, Navigation} = modules;
    const [slider, prev, next] = classes;

    const sl = new Swiper(slider, {
        modules: [Navigation],

        slidesPerView: 'auto',
        loop: true,
        speed: 900,
        on: {
            init: function() {
                console.log(this.params)
                if(this.slides.length > 5) {
                    this.params.centeredSlides = true
                    // this.params.centerInsufficientSlides = true
                    this.params.centeredSlidesBounds = true
                }
            }
        },
        allowTouchMove: false,
        navigation: {
            nextEl: next,
            prevEl: prev,
        },
    })

    
}