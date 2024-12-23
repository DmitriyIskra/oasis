export default function navBarMobile(el) {
    if(!el) return;

    let timeOutId = null;
    
    function activate() {
        const path = location.pathname;
        if(path.includes('product-card') && innerWidth < 962) {
            console.log('path', el)
            el.classList.add('bar__buttons_active');
        }
    }

    activate();

    window.addEventListener('resize', () => {
        clearTimeout(timeOutId);

        setTimeout(() => {
            activate();
        }, 50)
    })
}