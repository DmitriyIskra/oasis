// При открытии мобильного меню, если каталог меню открыто, то оно закрывается
export default function navMobileButton(checkboxNavMobile) {
    const checkboxControllCatalog = document.querySelector('.bar__switcher-checkbox');
    const buttonControllCatalog = document.querySelector('.bar__switcher-catalog');

    checkboxNavMobile.addEventListener('change', (e) => {
        if(checkboxControllCatalog.checked) {
            buttonControllCatalog.click();
        }
    })
}