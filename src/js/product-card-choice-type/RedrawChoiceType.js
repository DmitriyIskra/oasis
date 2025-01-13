export default class RedrawChoiceType {
    constructor(el) {
        this.el = el;
    }

    setActive(el) {
        el.classList.add('characteristics__types-item_active');
    }

    removeActive(el) {
        el.classList.remove('characteristics__types-item_active');
    }
}