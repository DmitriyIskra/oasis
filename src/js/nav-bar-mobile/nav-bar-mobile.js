export default function navBarMobile(el) {
    if(!el) return;

    let timeOutId = null;
    
    function activate() {
        const path = location.pathname;

        // активация кнопки купить или в корзину при заходе на страницу карточка товара
        if(path.includes('product-card') && innerWidth < 962) {
            const buttons = el.querySelector('.bar__buttons');
            buttons.classList.add('bar__buttons_active');
        }

        // подсветка иконки в соответствии с открытой страницей
        let pageName = null;
        
        if (path.includes('account')) pageName = 'account';
        if (path.includes('favorites')) pageName = 'favorites';
        if (path.includes('basket')) pageName = 'basket';

        const button = el.querySelector('.bar__item-' + pageName);
        if(button) button.classList.add('bar__item_color');
    }

    activate();

    window.addEventListener('resize', () => {
        clearTimeout(timeOutId);

        setTimeout(() => {
            activate();
        }, 50)
    })
}