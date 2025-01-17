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
        this.redraw.inputName.addEventListener('focus', this.focus);
        this.redraw.inputEmail.addEventListener('focus', this.focus);
        this.redraw.inputControll.addEventListener('change', this.change);
        this.redraw.textArea.addEventListener('input', this.input);
        this.redraw.textArea.addEventListener('paste', this.paste);
    }

    click(e) {
        // выбор звезд
        if(e.target.matches('.reviews__modal-star')) {
            this.redraw.choiceStars(e.target.closest('.reviews__modal-star'));
        }

        // отправка отзыва, валидация
        if(e.target.matches('.reviews__modal-submit')) {
            e.preventDefault();

            // валидация на заполненность
            //- /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+\.[A-Z]{2,4}$/i
            if(this.redraw.inputName.validity.valueMissing) {
                this.redraw.setInvalid(
                    this.redraw.inputName,
                    'Поле "Имя" обязательно для заполнения'
                );
            }
            // валидация на заполненность
            if(this.redraw.inputEmail.validity.valueMissing) {
                this.redraw.setInvalid(
                    this.redraw.inputEmail,
                    'Поле "Почта" обязательно для заполнения'
                );

                return;
            }
            // валидация на корректность ввода
            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+\.[A-Za-z]{2,4}$/i.test(this.redraw.inputEmail.value)) {
                this.redraw.setInvalid(
                    this.redraw.inputEmail,
                    'Некорректное значение'
                );

                return;
            }

            (async () => {
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
        if(e.target.validity.customError) {
            this.redraw.removeInvalid(e.target);
        }
    }

    change(e) {
        if(e.target.checked && innerWidth > 961) this.redraw.disableScroll();
        if(!e.target.checked && innerWidth > 961) this.redraw.enableScroll();
    }

    input(e) {
        this.redraw.countCymbols(e.target)
    }
}