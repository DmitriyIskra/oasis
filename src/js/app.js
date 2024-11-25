// Бургер меню
import ControllBurger from "./burger-menu/ControllBurger";
import RedrawBurger from "./burger-menu/RedrawBurger";

// Скрытие лого при открытии строки поиска
import controllSearch from "./header/controll-search"; 

// Закрытие каталога меню, при открытии мобильной навигации
import navMobileButton from "./header/nav-mobileButton";

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

// MOBILE
// Скрытие лого при открытии строки поиска
controllSearch();

// Закрытие каталога меню, при открытии мобильной навигации
navMobileButton(checkboxNavMobile);