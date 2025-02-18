// Скрывает лого при выдвижении строки поиска
export default function controllSearch() {
    const button = document.querySelector('#header__search-checkbox');
    const logo = document.querySelector('.header__logo');

    button.addEventListener('change', (e) => {
        logo.classList.toggle('header__logo_hide');
    }) 
}