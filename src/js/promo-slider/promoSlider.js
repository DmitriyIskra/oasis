export default function promoSlider(modules, classes) {
    const {Swiper, Navigation} = modules;
    const [slider, next, prev, pagination] = classes;
  
  
    new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: 4,
  
      loop: true,
      
      speed: 1000, 
      allowTouchMove: false,
      spaceBetween: 21,
    
      // Navigation arrows
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      // breakpoints: {
      //   // when window width is >= 320px
      //   320: {
      //     slidesPerView: 4,
      //   },
      //   // when window width is >= 962px
      //   962: {
      //     slidesPerView: 7,
      //   }
      // }
    });
  }