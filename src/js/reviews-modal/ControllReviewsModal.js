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

        // отправка отзыва, валидация
        if(e.target.matches('.reviews__modal-submit')) {
            e.preventDefault();

            // валидация на корректность ввода
            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+\.[A-Za-z]{2,4}$/i.test(this.redraw.inputEmail.value)) {
                this.redraw.setInvalid(
                    this.redraw.inputEmail,
                    'Некорректное значение'
                );

                return;
            }

            (async () => {
                // в  formData будет только один чекбокс соответствующий 
                // максимально выбранной звезде 
                const formData = new FormData(this.redraw.form);

                const response = await this.restApi.create(formData);

                if(!response) this.redraw.controllResultModal('error');

                if(response) this.redraw.controllResultModal('successfull');             
            })()
        }


        if(e.target.matches('.reviews__modal-cover')) {
            this.redraw.closeModal();
            let event = new Event("change");
            this.redraw.inputControll.dispatchEvent(event);
        }
    }

    focus(e) {
        // если элемент был не валиден при фокусе снимаем это свойство
        if(e.target.validity.customError) {
            this.redraw.removeInvalid(e.target);
        }
    }

    change(e) {
        // изменение состояния инпута отвечающего за открытие модалки отзывов
        // и скрытие scrollbar
        if(e.target.closest('#switcher-reviews-modal')) {
            console.log('dis')
            if(e.target.checked && innerWidth > 961) this.redraw.disableScroll();
            if(!e.target.checked && innerWidth > 961) this.redraw.enableScroll();
        }

        // отвечает за изменение состояния инпута отвечающего за звезду
        if(e.target.closest('.reviews__input-star')) this.validationRequired();
    }

    input(e) {
        // считает количество символов введенных в текстовое поле
        if(e.target.closest('textarea')) this.redraw.countCymbols(e.target);

        if(e.target.closest('.reviews__modal-input[required]')) {
            this.validationRequired();
        }
    }

    validationRequired() {
        const checkStar = this.redraw.inputStars.some(item => item.checked);

        if(
            this.redraw.inputName.value &&
            this.redraw.inputEmail.value &&
            checkStar
        ) {
            this.redraw.enableButtonSubmit();
            return;
        };

        this.redraw.disableButtonSubmit();
    }
}