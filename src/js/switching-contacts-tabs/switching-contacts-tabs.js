export default function switchingContactsTabs(controll, content) {
    controll.addEventListener('click', (e) => {
        // индекс таба по которому был клик 
        const i = e.target.dataset.index;
        // активные в данный момент таб и контент
        const currentTab = controll.querySelector('.contacts__controll-item_active');
        const currentContent = content.querySelector('.contacts__content-item_active');

        // контент который будем активировать
        const targetContent = content.querySelector(`[data-index="${i}"]`);

        // деактивируем текущие таб и контент
        currentTab.classList.remove('contacts__controll-item_active');
        currentContent.classList.remove('contacts__content-item_active');

        // активируем новые
        e.target.classList.add('contacts__controll-item_active');
        targetContent.classList.add('contacts__content-item_active');
    })
}
