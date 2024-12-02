export default function promoSlider(modules, classes) {
    const {Swiper, Navigation} = modules;
    const [slider, next, prev, pagination] = classes;
  
  
    const s = new Swiper(slider, {
      modules: [Navigation],
      
      loop: true,
      speed: 1000, 
    
      // Navigation arrows
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
      
      on: {
        resize: (e) => {
          if(+e.currentBreakpoint < 962) {
            if(e.slides.length === 1) {
              e.params.spaceBetween = 0;
              e.params.centeredSlides = false;          
            } else if(e.slides.length === 2) {
              e.params.centeredSlides = false;
              e.params.slidesPerView = 1;
              e.params.spaceBetween = 55;
              e.el.style.width = '90%'
              e.el.style.paddingLeft = '2.65%';
              e.el.style.paddingRight = '2.65%';
              console.log('amount 2')
            } else if(e.slides.length >= 3) {
              e.params.centeredSlides = true;
              e.params.slidesPerView = 1.22; // 1.22
            }
          } else {
            e.el.style.width = ''
            e.el.style.paddingLeft = '';
            e.el.style.paddingRight = '';
          }

          // e.update()
        },
        afterInit: (e) => {
          if(+e.currentBreakpoint < 962) {
            if(e.slides.length === 1) {
              e.params.spaceBetween = 0;
              e.params.centeredSlides = false;   
              e.params.slidesPerView = 1;       
            } else if(e.slides.length === 2) {
              e.params.centeredSlides = false;
              e.params.slidesPerView = 1;
              e.params.spaceBetween = 55;
              e.el.style.width = '90%'
              e.el.style.paddingLeft = '2.65%';
              e.el.style.paddingRight = '2.65%';
              console.log('amount 2')
            } else if(e.slides.length >= 3) {
              e.params.centeredSlides = true;
              e.params.slidesPerView = 1.22; // 1.22
              e.params.spaceBetween = 8;
            }
          } else {
            e.el.style.width = ''
            e.el.style.paddingLeft = '';
            e.el.style.paddingRight = '';
          }
        }
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          allowTouchMove: true,
        },
        // when window width is >= 962px
        962: {
          allowTouchMove: false,
          spaceBetween: 21,
          slidesPerView: 4,
        }
      }
    });

    

  }