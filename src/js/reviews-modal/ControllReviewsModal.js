export default class ControllReviewsModal {
    constructor(redraw) {
        this.redraw = redraw;
        
        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.redraw.el.addEventListener('click', this.click);
        this.redraw.inputName.addEventListener('focus', this.focus);
        this.redraw.inputEmail.addEventListener('focus', this.focus);
    }

    click(e) {
        if(e.target.matches('.reviews__modal-star')) {
            this.redraw.choiceStars(e.target.closest('.reviews__modal-star'));
        }
        if(e.target.matches('.reviews__modal-submit')) {
            e.preventDefault();

            //- /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+\.[A-Z]{2,4}$/i
            if(this.redraw.inputName.validity.valueMissing) {
                this.redraw.setInvalid(
                    this.redraw.inputName,
                    'Поле "Имя" обязательно для заполнения'
                );
            }

            if(this.redraw.inputEmail.validity.valueMissing) {
                this.redraw.setInvalid(
                    this.redraw.inputEmail,
                    'Поле "Почта" обязательно для заполнения'
                );

                return;
            }

            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+\.[A-Za-z]{2,4}$/i.test(this.redraw.inputEmail.value)) {
                this.redraw.setInvalid(
                    this.redraw.inputEmail,
                    'Некорректное значение'
                );
            }
        }
    }

    focus(e) {
        if(e.target.validity.customError) {
            this.redraw.removeInvalid(e.target);
        }
    }
}