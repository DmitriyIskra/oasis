export default function productCardOpenComposition(el, arrow) {
    const child = el.children[0];

    // считаем строки
    const amountRows = child.children[0].getClientRects().length;

    if(amountRows && amountRows >= 6) el.style.height = `${7.51}vw`

    el.style.display = 'block'
    const oldHeight = el.clientHeight;
    const newHeight = child.clientHeight;
    el.style.display = '-webkit-box'

    let state = null;

    if(oldHeight >= newHeight) {
        arrow.style.display = "none";
    }
    
    arrow.addEventListener('click', () => {
        if(!state) {
            el.style.height = `${newHeight}px`;
            el.style.display = 'block'
            return;
        }

        el.style.height = `${oldHeight}px`;
    })

    el.addEventListener('transitionend', () => {
        state = state ? null : true; 

        if(state) arrow.dataset.state = 'active';
        if(!state) {
            arrow.dataset.state = '';
            el.style.display = '-webkit-box';
        }
    })
}