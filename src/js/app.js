// Бургер меню
import ControllBurger from "./burger-menu/ControllBurger";
import RedrawBurger from "./burger-menu/RedrawBurger";

// Скрытие лого при открытии строки поиска
import controllSearch from "./header/controll-search"; 

// Закрытие каталога меню, при открытии мобильной навигации
import navMobileButton from "./header/nav-mobileButton";

// Свайпер для слайдеров
import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

// Слайдер на главной странице с банннерами
import mainSlider from "./main-slider/main-slider";

// Слайдер товары по акции
import promoSlider from "./promo-slider/promoSlider";

// Чекбокс для управления мобильным меню
const checkboxNavMobile = document.querySelector('#nav-mobile');

// Бургер меню
const navMobile = document.querySelector('.burger__mobile-list');
if(navMobile) {
    const switcher = document.querySelector('.bar__switcher-checkbox');
    const boxes = navMobile.querySelectorAll('input');

    const params = {
        switcherCheckboxClass : 'bar__switcher-checkbox',
    }

    const redraw = new RedrawBurger(navMobile, switcher, boxes, checkboxNavMobile, params);
    const controll = new ControllBurger(redraw);
    controll.init();
} 

// Главный слайдер, на главной странице
const sliderMain = document.querySelector('.main__slider');
if(mainSlider) {
    const modules = {
        Swiper,
        Pagination,
        Navigation,
    }

    const classes = [
        '.main__slider',
        '.main__slider-next',
        '.main__slider-prev',
        '.main__slider-pagination',
    ]

    mainSlider(modules, classes);
}

// Слайдер товары по акции
const sliderPromo =  document.querySelector('.goods-promo__slider');
if(sliderPromo) {
    const modules = {
        Swiper,
        Navigation,
    }

    const classes = [
        '.goods-promo__slider',
        '.goods-promo__arrow-next',
        '.goods-promo__arrow-prev',
    ]

    promoSlider(modules, classes);
}


// MOBILE
// Скрытие лого при открытии строки поиска
controllSearch();

// Закрытие каталога меню, при открытии мобильной навигации
navMobileButton(checkboxNavMobile);