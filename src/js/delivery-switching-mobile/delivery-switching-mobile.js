export default function deliverySwitchingMobile(controll, content) {
    controll.addEventListener('click', (e) => {
        // индекс таба по которому был клик
        const i = e.target.dataset.index;
        // активные в данный момент таб и контент
        const currentTab = controll.querySelector('.delivery__controll-item_active');
        const currentContent = content.querySelector('.delivery__content-item_active');

        // контент который будем активировать
        const targetContent = content.querySelector(`[data-index="${i}"]`);

        // деактивируем текущие таб и контент
        currentTab.classList.remove('delivery__controll-item_active');
        currentContent.classList.remove('delivery__content-item_active');

        // активируем новые
        e.target.classList.add('delivery__controll-item_active');
        targetContent.classList.add('delivery__content-item_active');
    })
}
