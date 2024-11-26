export default function mainSlider(modules, classes) {
  const {Swiper, Pagination, Navigation} = modules;
  const [slider, next, prev, pagination] = classes;


  new Swiper(slider, {
    modules: [Pagination, Navigation],
    slidesPerView: 1,

    loop: true,
    
    speed: 1500, 
    allowTouchMove: false,
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