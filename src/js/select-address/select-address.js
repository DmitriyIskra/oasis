/**
 * @name кастомный селект для выбора адреса
 * @description отображает название выбранного адреса
 * */ 
export default function selectAddress(el) {
    const select = el.querySelector('.sel-address__selected-text');
    const options = el.querySelector('.sel-address__list');

    const handlerClick = (e) => {
        if(e.target.closest('.sel-address__item')) {
            const value = e.target.dataset.type;
            
            select.textContent = value;
            select.dataset.type = value;
        }
    }

    options.addEventListener('click', handlerClick);
}
