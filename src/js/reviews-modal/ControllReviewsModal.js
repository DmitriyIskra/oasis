export default class ControllReviewsModal {
    constructor(redraw, restApi) {
        this.redraw = redraw;
        this.restApi = restApi;
        
        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
        this.change = this.change.bind(this);
        this.input = this.input.bind(this);
    }

    init() {
        this.registerEvents(); 
    }

    registerEvents() {
        this.redraw.el.addEventListener('click', this.click);

        this.redraw.inputStars.forEach(checkbox => checkbox.addEventListener('change', this.change));

        this.redraw.inputName.addEventListener('focus', this.focus);
        this.redraw.inputName.addEventListener('input', this.input);

        this.redraw.inputEmail.addEventListener('focus', this.focus);
        this.redraw.inputEmail.addEventListener('input', this.input);

        this.redraw.inputControll.addEventListener('change', this.change);

        this.redraw.textArea.addEventListener('input', this.input);
    }

    click(e) {
        // выбор звезд
        if(e.target.matches('.reviews__modal-star')) {
            this.redraw.choiceStars(e.target.closest('.reviews__modal-star'));
        }

        // отправка отзыва и валидация
        if(e.target.matches('.reviews__modal-submit')) {
            e.preventDefault();

            // START ВАЛИДАЦИЯ
            // -- валидация на заполненность полей и выбор звезд
            const resultInputs = this.validationRequiredInputs();
            if(Boolean(resultInputs.length)) {
                resultInputs.forEach(input => this.redraw.setInvalidInput(
                    input,
                    'Поле обязательное для заполнения'
                ))
            }
            
            const resultStars = this.validationRequiredStars();
            if(!resultStars) this.redraw.setInvalidStars();
            // когда звезды не выбраны или есть не заполненные поля
            //  останавливаем и показываем ошибки
            if(Boolean(resultInputs.length) || !resultStars) return;

            // -- валидация на корректность ввода
            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+\.[A-Za-z]{2,4}$/i.test(this.redraw.inputEmail.value)) {
                this.redraw.setInvalidInput(
                    this.redraw.inputEmail,
                    'Некорректное значение'
                );

                return; 
            }

            // END ВАЛИДАЦИЯ

            (async () => {
                // в  formData будет только один чекбокс соответствующий 
                // максимально выбранной звезде 
                const formData = new FormData(this.redraw.form);

                const response = await this.restApi.create(formData);

                if(!response) this.redraw.openWindowModal('error');

                if(response) this.redraw.openWindowModal('success');             
            })()
        }

        // Клик вне модалки по затемненному фону, закрывает модалку
        if(e.target.matches('.reviews__modal-cover')) {
            this.redraw.closeModal();
            let event = new Event("change");
            this.redraw.inputControll.dispatchEvent(event);
        }

        // Закрытие модалки по крестику
        if(e.target.closest('.reviews__modal-close')) {
            this.redraw.closeModal();
            let event = new Event("change");
            this.redraw.inputControll.dispatchEvent(event);
        }
    }

    focus(e) {
        // если элемент был не валиден при фокусе снимаем это свойство
        if(e.target.validity.customError) {
            this.redraw.removeInvalidInput(e.target);
        }
    }

    change(e) {
        // SCROLLBAR, CHOOICE WINDOW FOR MODAL
        // выбор окна модалки при открытии
        // и скрытие scrollbar если модалка открыта
        if(e.target.closest('#switcher-reviews-modal')) {
            if(e.target.checked) this.redraw.openWindowModal('review');

            if(e.target.checked) this.redraw.disableScroll();

            if(!e.target.checked) this.redraw.enableScroll();

        }

        // ВЫБОР ЗВЕЗДЫ
        // блокирует или разблокирует кнопку отправить
        // если показывается ошибка на звездах снимает ее
        if(e.target.closest('.reviews__input-star')) {
            this.switchingButtonSubmit();
            if(this.redraw.starsError.hasAttribute('invalid')) {
                this.redraw.removeInvalidStars();
            }
        };
    }

    input(e) {
        // считает количество символов введенных в текстовое поле
        if(e.target.closest('textarea')) this.redraw.countCymbols(e.target);

        // БЛОКИРОВКА / РАЗБЛОКИРОВКА КНОПКИ ОТПРАВИТЬ
        // При запонении одного из обязательных полей,
        // проверяем заполнены ли они все и выбрана ли звезда, по результатам 
        // разблокировка или блокировка кнопки отправить
        if(e.target.closest('.reviews__modal-input[required]')) {
            this.switchingButtonSubmit(); // проверяет все ли параметры выбраны
        }
    }

    // разблокировка или блокировка кнопки отправить
    // по результатам проверки заполнены ли все обязательные поля и выбрана ли звезда
    switchingButtonSubmit() {
        if(
            !Boolean(this.validationRequiredInputs().length) &&
            this.validationRequiredStars()
        ) {
            this.redraw.enableButtonSubmit();
            return;
        };

        this.redraw.disableButtonSubmit();
    }

    // валидирует инпуты на заполненность
    validationRequiredInputs() {
        const elements = [...this.redraw.el.querySelectorAll('.reviews__modal-input[required]')];
        const elNoValid = elements.filter(el => !el.value);

        return elNoValid;
    }
    
    // валидирует выбранна ли звезда
    validationRequiredStars() {
        // выбрана ли хоть одна звезда
        const checkStar = this.redraw.inputStars.some(item => item.checked);
        if(!checkStar) return false;

        return true;
    }
}