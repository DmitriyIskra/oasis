export default function mainSlider(modules, classes) {
  const {Swiper, Pagination, Navigation, Autoplay} = modules;
  const [slider, next, prev, pagination] = classes;


  new Swiper(slider, {
    modules: [Pagination, Navigation, Autoplay],
    slidesPerView: 1,

    loop: true,
    
    speed: 1500,
    // If we need pagination 
    pagination: {
      el: pagination,
      modifierClass: 'main__slider-pagination-',
      clickable: true,
    },
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      // when window width is <= 961px && window width >= 320px 
      320: {
        speed: 500,
        allowTouchMove: true,
      },
      // when window width is >= 962px
      962: {
        allowTouchMove: false,
      }
    }
  });
}