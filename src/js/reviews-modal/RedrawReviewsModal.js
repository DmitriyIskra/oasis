export default class RedrawReviewsModal {
    constructor(el) {
        this.el = el;

        this.stars = [...this.el.querySelectorAll('.reviews__modal-star')];

        this.form = this.el.querySelector('.reviews__form');
        this.inputStars = this.el.querySelectorAll('.reviews__input-star');
        this.inputName = this.el.querySelector('.reviews__modal-input[name="name"]');
        this.inputEmail = this.el.querySelector('.reviews__modal-input[name="email"]');
    }

    choiceStars(star) {
        const num = +star.dataset.num;
        this.stars.forEach(star => {
            if(+star.dataset.num <= num) {
                star.classList.add('reviews__stars_active');
                console.log(star)

                return;
            }

            star.className = 'reviews__modal-star';
        })
    }

    setInvalid(input, textError) {
        const parent = input.parentElement;
        const error = input.previousElementSibling;
        input.setCustomValidity(textError);

        parent.setAttribute('invalid', '');
        error.textContent = textError;
    }

    removeInvalid(input) {
        const parent = input.parentElement;
        const error = input.previousElementSibling;

        input.setCustomValidity('');

        parent.removeAttribute('invalid');
        error.textContent = '';
    }
}