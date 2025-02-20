export default class RedrawReviewsModal {
    constructor(el) {
        this.el = el;

        this.form = this.el.querySelector('.reviews__form');
        // inputs которые стоят в DOM перед div со звездами
        this.inputStars = [...this.el.querySelectorAll('.reviews__input-star')];
        // div в которых звезды
        this.stars = [...this.el.querySelectorAll('.reviews__modal-star')];

        this.inputName = this.el.querySelector('.reviews__modal-input[name="name"]');
        this.inputEmail = this.el.querySelector('.reviews__modal-input[name="email"]');
        this.textArea = this.el.querySelector('textarea');
        this.buttonSubmit = this.el.querySelector('.reviews__modal-submit');

        // input по которому открывается модалка для написания отзыва
        this.inputControll = this.el.previousElementSibling;

        this.counter = this.el.querySelector('.reviews__counter').firstElementChild;

        // модалки с результатом отправки отзыва
        this.resultModals = {
            successfull : document.querySelector('.reviews__response-cover-success '),
            error : document.querySelector('.reviews__response-cover-error'),
        }

        this.activeResultModal = null; 
    }

    choiceStars(star) {
        const num = +star.dataset.num;
        this.stars.forEach(star => {
            const input = star.previousElementSibling;
            if(+star.dataset.num <= num) {
                star.classList.add('reviews__stars_active');              

                return;
            }

            star.className = 'reviews__modal-star';
        })

        // Очистка чекбоксов которые были выбраны ранее, если таковые есть
        this.inputStars.forEach(checkbox => {
            const numCheckbox = +checkbox.nextElementSibling.dataset.num;
            if(num !== numCheckbox && checkbox.checked) checkbox.checked = false; 
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

    /**
     * @description Закрывает модалку по клику на подложку
     * */ 
    closeModal() {
        this.inputControll.checked = false;
    }

    /**
     * @description скрывает scrollbar на странице
     * */ 
    disableScroll() {
        const widthClient = document.body.offsetWidth;
        const widthWindow = innerWidth;
        
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${widthWindow - widthClient}px`;
    }

    enableScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ``;
    }

    /**
     * @description контроль количества введенных символов в textarea
     * */ 
    countCymbols(target) {
        let amount = target.value.length;

        if(amount > 250) {
            let arr = target.value.split('');
            arr.length = 250;
            target.value = arr.join('');
            amount = 250;
        }

        this.counter.textContent = amount;
    }

    controllResultModal(name) {
        this.closeModal();
        this.activeResultModal = this.resultModals[name];
        this.activeResultModal.classList.add('reviews__response_active');

        this.activeResultModal.addEventListener('click', (e) => {
            if(e.target.closest('.reviews__modal-close')) {
                this.activeResultModal.classList.remove('reviews__response_active');
            }
        }, {once : true})
    }

    disableButtonSubmit() {
        if(this.buttonSubmit.classList.contains('reviews__modal-submit_active')) {
            this.buttonSubmit.classList.remove('reviews__modal-submit_active');
        }
    }

    enableButtonSubmit() {
        if(!this.buttonSubmit.classList.contains('reviews__modal-submit_active')) {
            this.buttonSubmit.classList.add('reviews__modal-submit_active');
        }
    }
}