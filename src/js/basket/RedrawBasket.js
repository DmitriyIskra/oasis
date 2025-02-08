export default class RedrawBasket {
    constructor(el, Imask) {
        this.el = el;
        this.Imask = Imask;

        this.inputsPhone = [
            this.el.querySelector('.basket__form-user-phone'),
            this.el.querySelector('.basket__form-user-additional-phone'),
        ];
        // инпут для списания баллов
        this.inputBalls = this.el.querySelector('.basket__balls-deduct-input');

        // текущий instance Шьфыл
        this.currentImask = null;
    }

    // Включает подсветку на индикаторе таба
    onTab(tab) {
        tab.setAttribute('active', ''); 
    }
    // Выключает подсветку на индикаторе таба
    offTab(parentOfTab) {
        const currentTab = parentOfTab.querySelector('.basket__tab[active]');
        currentTab.removeAttribute('active');
    }

    // установка и удаление маски для телефон
    setPhoneImask(input) {
        try {
            this.currentImask = new this.Imask(input, {
                mask: '+{7} (000) 000-00-00',
                lazy: false,
                placeholderChar: '_',
            })
        } catch (error) {
            throw new Error('Ошибка добавления маски к полю phone')
        }
    }
    removePhoneImask(input) {
        if(this.currentImask.value && 
            (/\+7 \(___\) ___-__-__/.test(this.currentImask.value))) {
            this.currentImask.value = '';
            input.value = '';
        }

        this.currentImask.destroy();
        this.currentImask = null;
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
                // const index = arr.indexOf(key);
                if(index >= 0) arr.splice(index, 1);
            }
        });
        
        el.value = arr.join('');
    }
}