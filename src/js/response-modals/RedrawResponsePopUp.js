export default class RedrawResponsePopUp {
    constructor(dialog, iMask) {
        this.iMask = iMask;

        this.dialog = dialog;
        this.wrContentDialog = this.dialog.querySelector('.dialog__content');
        this.buttonBack = this.dialog.querySelector('.dialog__back');
        this.buttonClose = this.dialog.querySelector('.dialog__close');

        this.currentIMask = null;
    }

    showModal(fullShow = true) {
        if(fullShow) {
            const widthScreen = innerWidth;
            const widthDoc = document.body.offsetWidth;
            const sizePaddingRight = widthScreen - widthDoc;
            document.body.style.paddingRight = `${sizePaddingRight}px`;
            document.body.style.backgroundColor = '#ebebeb';
    
            document.body.style.overflow = 'hidden';
    
            this.dialog.showModal();
        }
    }

    closeModal(fullClose = true) {
        if(this.buttonBack.classList.contains('dialog__back_active')) {
            this.buttonBack.classList.remove('dialog__back_active');
        }

        this.clearContent();
        
        if(fullClose) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.style.backgroundColor = '';

            this.dialog.close()
        };
    }

    clearContent() {
        [...this.wrContentDialog.children].forEach(el => el.remove());
    }

    // включает стрелку назад в попап для второго этапа регистрации
    showArrowBack() {
        this.buttonBack.classList.add('dialog__back_active');
    }

    // ОШИБКИ при валидации обязательных полей
    setError(el, textError = null) {
        const parent = el.parentElement;
        const elError = el.previousElementSibling;

        parent.setAttribute('invalid', '');
        el.setCustomValidity('error');
        if(textError) elError.textContent = textError; 
    }

    removeError(el) {
        const parent = el.parentElement;
        const elError = el.previousElementSibling;

        parent.removeAttribute('invalid');
        el.setCustomValidity('');
        if(elError) elError.textContent = '';
    }

    // установки маски на поле телефон
    addIMask(el) {
        try {
            this.currentIMask = new this.iMask(el, {
                mask: '+{7} (000) 000-00-00',
                    lazy: false,
                    placeholderChar: '_',
            });
        } catch (error) {
            throw new Error('Ошибка добавления маски к полю phone')
        }
    }

    // удаление маски на поле телефон
    removeIMask() {
        this.currentImask.destroy();
        this.currentImask = null;
    }

    /**
     * @description запускае timer в попап
     * @param activeModal активный попап
     * @param repeat принимает true если код отправлен повторно и таймер нужно перезапустить
     * */ 
    startTimer(activeModal, seconds, repeat = false) {
        // Проверка на наличие переданного попап
        // if(!activeModal || !activeModal instanceof HTMLElement) {
        //     throw new Error('Первый передаваемый параметр обязателен, и должен быть HTMLElement');
        // }

        if(!seconds || !Number.isInteger(+seconds)) {
            throw new Error('Первый передаваемый параметр обязателен, и должен быть целым числом');
        }

        const buttonRepeat = activeModal.querySelector('.dialog__button-repeat');

        // если кнопка уже была разблокирована, повторная блокировка, на время работы таймера
        if(repeat === true) buttonRepeat.classList.add('dialog__button_disabled');

        // элемент с числовым значением таймера
        let timerNum = activeModal.querySelector('.dialog__timer-num');
        // установка количества секунд для отсчета
        timerNum.textContent = seconds;
        
        // Запускаем таймер обратного отсчета
        let timeOutId = setInterval(() => {
            const timerValue = +timerNum.textContent;

            const newValue = timerValue - 1
            timerNum.textContent = newValue;

            if(newValue === 0) {
                buttonRepeat.classList.remove('dialog__button_disabled');

                clearInterval(timeOutId);
            }
        }, 1000);
    }
}