export default class ControllReviewsModal {
    constructor(redraw) {
        this.redraw = redraw;
        
        this.click = this.click.bind(this);
        this.focus = this.focus.bind(this);
    }

    init() {
        this.registerEvents();
        console.log(this.redraw.inputName.validity)
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
                const parent = this.redraw.inputName.parentElement;
                const error = this.redraw.inputName.previousElementSibling;
                this.redraw.inputName.setCustomValidity('Поле "Имя" обязательно для заполнения');
                
                parent.setAttribute('invalid', '');
                error.textContent = 'Поле "Имя" обязательно для заполнения';
            }

            if(this.redraw.inputEmail.validity.valueMissing) {
                const parent = this.redraw.inputEmail.parentElement;
                const error = this.redraw.inputEmail.previousElementSibling;
                this.redraw.inputEmail.setCustomValidity('Поле "Почта" обязательно для заполнения');

                parent.setAttribute('invalid', '');
                error.textContent = 'Поле "Почта" обязательно для заполнения';
            }
        }
    }

    focus(e) {
        if(e.target.validity.customError) {
            const parent = e.target.parentElement;
            const error = e.target.previousElementSibling;

            e.target.setCustomValidity('');

            parent.removeAttribute('invalid');
            error.textContent = '';
        }
    }
}