export default function salesHitsSlider(modules, classes) {
    const {Swiper, Autoplay, EffectFade, Thumbs} = modules;
    const [sThumbs, sGoods] = classes;

    const thumbs = new Swiper(sThumbs, {
        slidesPerView: 10,
        loop: true,
        allowTouchMove: false,
    })

    const goods = new Swiper(sGoods, {
        modules: [EffectFade, Thumbs, Autoplay],
        effect: 'fade',
        // crossFade: false,
        speed: 1000,
        thumbs: {
            swiper: thumbs,
        },
        autoplay: {
            delay: 2500
        }
    })
}