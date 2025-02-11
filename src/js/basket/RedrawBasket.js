export default class RedrawBasket {
    constructor(el, Imask) {
        this.el = el;
        this.Imask = Imask;

        this.goodsList = this.el.querySelector('.basket__goods')
        this.formstList = this.el.querySelector('.basket__forms')

        this.inputsPhone = [
            this.el.querySelector('.basket__form-user-phone'),
            this.el.querySelector('.basket__form-user-additional-phone'),
        ];

        this.inputsZipCode = [...this.el.querySelectorAll("input[name='zipcode']")];
        // инпут для списания баллов
        this.inputBalls = this.el.querySelector('.basket__balls-deduct-input');

        // текущий instance Imask
        this.currentImask = null;

        // последний активный tab forms
        this.currentActiveTabD = null;
        // текущая открытая форма forms
        this.currentOpenFormD = null;
        // последний активный tab goods
        this.currentActiveTabP = null;
        // текущая открытая форма goods
        this.currentOpenFormP = null;

        this.lastLoadWidth = innerWidth;
    }
    
    // Включает подсветку на индикаторе таба
    onTab(tab, type) {
        tab.setAttribute('active', '')

        const nextElement = tab.nextElementSibling;

        if(type === 'delivery') {
            this.currentOpenFormD = nextElement.tagName === 'FORM' ? nextElement : null;
            this.currentActiveTabD = tab;        
        }
        if(type === 'payment') {
            this.currentOpenFormP = nextElement.tagName === 'FORM' ? nextElement : null;
            this.currentActiveTabP = tab;        
        }
    }
    // Выключает подсветку на индикаторе таба
    offTab(parent, type) {
        const lastActive = parent.querySelector('.basket__tab[active]');
        if(lastActive) lastActive.removeAttribute('active');
        
        if(type === 'delivery') {
            this.currentActiveTabD = null;
            this.currentOpenFormD = null;
        }
        if(type === 'payment') {
            this.currentActiveTabP = null;
            this.currentOpenFormP = null;
        }
    }

    // Открытие/закрытие формы для МОБИЛЬНОЙ версии
    openForm(type) {
        let totalHeight = 0;
        if(type === 'delivery' && this.currentOpenFormD) {
            const children = [...this.currentOpenFormD.children]

            totalHeight = children.reduce((acc, item) => {
                return acc += item.offsetHeight;
            }, 0)

            this.currentOpenFormD.style.height = `${totalHeight}px`
            this.currentOpenFormD.style.display = `block`;
        }

        if(type === 'payment' && this.currentOpenFormP) {
            const children = [...this.currentOpenFormP.children]

            totalHeight = children.reduce((acc, item) => {
                return acc += item.offsetHeight;
            }, 0)

            this.currentOpenFormP.style.height = `${totalHeight}px`
            this.currentOpenFormP.style.display = `block`;
        }
    }
    closeForm(type) {
        if(type === 'delivery' && this.currentOpenFormD) {
            this.currentOpenFormD.style.height = '0px';
            this.currentOpenFormD.addEventListener('transitionend', (e) => {
                e.target.style.display = '';
            }, {once: true})
        }

        if(type === 'payment' && this.currentOpenFormP) {
            this.currentOpenFormP.style.height = '0px';
            this.currentOpenFormP.addEventListener('transitionend', (e) => {
                e.target.style.display = '';
            }, {once: true})
        }
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
                arr.splice(index, 1);
                
            }
        });

        el.value = arr.join('');
    }
    
    // ONLY MOBILE 
    switchScreens() {
        this.goodsList.classList.toggle('basket__active');
        this.formstList.classList.toggle('basket__active');
    }
}