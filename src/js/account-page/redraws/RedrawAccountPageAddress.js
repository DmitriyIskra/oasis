export default class RedrawAccountPageAddress {
    constructor(screen) {
        this.screen = screen;

        // выбор адреса
        this.wrSelect = this.screen.querySelector('.sel-address');
    }

    // ограничение длинны ввода
    maxSize(el, amount) {
        const val = el.value;
        const arr = val.split('');

        if(arr.length >= amount) arr.length = 6;

        el.value = arr.join('');
    }

    // ввод только цифр
    onlyNum(el) {
        const val = el.value;
        const arr = val.split('');

        arr.forEach((item, index) => {
            if(!/\d/.test(item)) {
                delete arr[index];
            }
        });
        const result = arr.map(item => item);

        el.value = result.join('');
    }
}