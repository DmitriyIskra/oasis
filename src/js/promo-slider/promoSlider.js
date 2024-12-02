export default function promoSlider(modules, classes) {
    const {Swiper, Navigation} = modules;
    const [slider, next, prev, pagination] = classes;
  
  
    new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: 4,
  
      loop: true,
      speed: 1000, 
      
    
      // Navigation arrows
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.22,
          centeredSlides: true,
          spaceBetween: 8,
        },
        // when window width is >= 962px
        962: {
          allowTouchMove: false,
          spaceBetween: 21,
        }
      }
    });
  }