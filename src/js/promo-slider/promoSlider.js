export default function promoSlider(modules, classes) {
    const {Swiper, Navigation, Autoplay} = modules;
    const [slider, next, prev, pagination] = classes;
  
  
    const s = new Swiper(slider, {
      modules: [Navigation, Autoplay],
      
      loop: true,
      speed: 1000, 
    
      // Navigation arrows
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          centeredSlides: true,
          slidesPerView: 1.22, // 1.22
          spaceBetween: 8,
          allowTouchMove: true,
          autoplay: false,
        },
        // when window width is >= 962px
        962: {
          allowTouchMove: false,
          centeredSlides: false,
          spaceBetween: 21,
          slidesPerView: 4,
          
        }
      }
    });
  }