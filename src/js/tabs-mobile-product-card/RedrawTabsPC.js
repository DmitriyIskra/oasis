export default class RedrawTabsPC {
    constructor() {
        
    }

    openContent(el) {
        console.log(el)
        const childs = [...el.children];
        console.log('childs - ', childs)
        console.log('childs[0].clientHeight - ', childs[0].clientHeight)
        let height = 0;

        childs.forEach(child => height += child.clientHeight);
        console.log(height);
        // return
        el.style.height = `${height}px`;
    }

    closeContent(el) {
        el.style.height = 0;
    }
}