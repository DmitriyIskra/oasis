// Бургер меню
import ControllBurger from "./burger-menu/ControllBurger";
import RedrawBurger from "./burger-menu/RedrawBurger";
// Скрытие лого при открытии строки поиска
import controllSearch from "./header/controll-search"; 
// Закрытие каталога меню, при открытии мобильной навигации
import navMobileButton from "./header/nav-mobileButton";
// Свайпер для слайдеров
import Swiper from "swiper";
import { 
    Navigation, 
    Pagination, 
    Autoplay, 
    EffectFade, 
    Thumbs,
    Grid,
    Virtual,
} from 'swiper/modules';
// Слайдер на главной странице с банннерами
import mainSlider from "./main-slider/main-slider";
// Слайдер товары по акции
import promoSlider from "./promo-slider/promoSlider";
// Слайдер хиты продаж
import salesHitsSlider from "./sales-hits-slider/salesHitsSlider";
// Слайдер карточка товара
import ControllCardSlider from "./card-slider/ControllCardSlider";
import RedrawCaredSlider from "./card-slider/RedrawCaredSlider";
// Работа "состав" в карточке товара
import productCardOpenComposition from "./product-card-open-composition/product-card-open-composition";
// Слайдер "может быть интересно"
import interestingSlider from "./interesting-slider/interestingSlider";
// Табы в карточке товара Характеристики описание отзывы
import ControllTabsPC from "./tabs-mobile-product-card/ControllTabsPC";
import RedrawTabsPC from "./tabs-mobile-product-card/RedrawTabsPC";
// Активация кнопки купить для nav-bar-mobile, если страница карточка товара
import navBarMobile from "./nav-bar-mobile/nav-bar-mobile";
// Модалка для написания отзыва
import ControllReviewsModal from "./reviews-modal/ControllReviewsModal";
import RedrawReviewsModal from "./reviews-modal/RedrawReviewsModal";
// По клику на крестик закрывается окно с результатом отправки отзыва
import closeReviewsResponseModal from "./close-reviews-response-modal/closeReviewsResponseModal";

// ---------------------------------------------------------------------

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
        Autoplay,
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
        Autoplay,
    }

    const classes = [
        '.goods-promo__slider',
        '.goods-promo__arrow-next',
        '.goods-promo__arrow-prev',
    ]

    promoSlider(modules, classes);
}

// Слайдер хиты продаж
const salesHits = document.querySelector('.sales-hits');
if(salesHits) {
    const modules = {
        Swiper,
        Autoplay,
        EffectFade,
        Thumbs,
        Grid
    }

    const classes = [
        '.sales-hits__thumbs',
        '.sales-hits__goods',
        
    ]

    const fewSliders = [...document.querySelectorAll('.sales-hits__sub-slider')];

    salesHitsSlider(modules, classes, fewSliders);
}

// Слайдер карточка товара
const sliderCard = document.querySelector('.product__wr-images');
if(sliderCard) {
    const modules = {
        Swiper,
        Navigation,
        EffectFade,
        Thumbs,
        Virtual,
    }

    const classes = {
        mainSlider: '.product__slider',
        mainSlide: '.product__slide',
        thumbsSlider: '.product__thumbs',
        thumbSlide: '.product__thumb-slide',
        prev: '.product__goods-prev',
        next: '.product__goods-next',
        prev_m: '.product__goods-wr-arrow_mobile-prev',
        next_m: '.product__goods-wr-arrow_mobile-next',
        zoom: '.product__zoom-cover',
        zoomSlider: '.product__zoom-swiper',
        zoomActive: 'product__zoom-cover_active',
        closeZoom: '.zoom__close',
        zoomPrev: '.product__zoom-arrow_prev',
        zoomNext: '.product__zoom-arrow_next',
    }

    const zoom = document.querySelector('.product__zoom-cover');

    const redraw = new RedrawCaredSlider(sliderCard, zoom, modules, classes);
    const controll = new ControllCardSlider(redraw);
    controll.init();
}

// Работа "состав" в карточке товара
const characteristicsComposition = document.querySelector('.characteristics__composition');
if(characteristicsComposition) {
    const arrow = document.querySelector('.characteristics__data-arrow');
    productCardOpenComposition(characteristicsComposition, arrow);
}

const sliderInteresting = document.querySelector('.interesting-sl');
if(sliderInteresting) {
    const modules = {
        Swiper,
        Navigation,
        Autoplay,
    }

    const classes = [
        '.interesting-sl',
        '.interesting-sl__prev',
        '.interesting-sl__next',
    ]

    interestingSlider(modules, classes)
}

// Модалка для написания отзыва
const modalReviews = document.querySelector('.reviews__modal');
if(modalReviews) {
    const redraw = new RedrawReviewsModal(modalReviews);
    const controll = new ControllReviewsModal(redraw);
    controll.init();
}

// Hезультатом отправки отзыва по клику на крестик закрывается
const reviewsRespModals = document.querySelectorAll('.reviews__response-cover');
if(reviewsRespModals) closeReviewsResponseModal(reviewsRespModals);

// MOBILE
// Скрытие лого при открытии строки поиска
controllSearch();

// Закрытие каталога меню, при открытии мобильной навигации
navMobileButton(checkboxNavMobile);

// Табы в карточке товара Характеристики описание отзывы
const tabsProdCard = [...document.querySelectorAll('.product__tab-button_m')];
if(tabsProdCard) {
    const redraw = new RedrawTabsPC();
    const controll = new ControllTabsPC(redraw, tabsProdCard);
    controll.init();
}

// Активация кнопки купить для nav-bar-mobile, если страница карточка товара
const barButtonsBuy = document.querySelector('.bar__buttons_active');
navBarMobile(barButtonsBuy);
