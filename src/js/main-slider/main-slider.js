export default function mainSlider(modules, classes) {
  const {Swiper, Pagination, Navigation} = modules;
  const [slider, next, prev, pagination] = classes;


  new Swiper(slider, {
    modules: [Pagination, Navigation],
    slidesPerView: 1,

    loop: true,
    
    speed: 1500,
    // If we need pagination
    pagination: {
      el: pagination,
      modifierClass: 'main__slider-pagination-',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
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
  });
}