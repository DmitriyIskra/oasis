export default class RedrawReviewsModal {
    constructor(el) {
        this.el = el;

        this.form = this.el.querySelector('.reviews__form');
        // inputs которые стоят в DOM перед div со звездами
        this.inputStars = [...this.el.querySelectorAll('.reviews__input-star')];
        // div в которых звезды
        this.stars = [...this.el.querySelectorAll('.reviews__modal-star')];
        this.starsError = this.el.querySelector('.reviews__modal-stars-error');

        this.inputName = this.el.querySelector('.reviews__modal-input[name="name"]');
        this.inputEmail = this.el.querySelector('.reviews__modal-input[name="email"]');
        this.textArea = this.el.querySelector('textarea');
        this.buttonSubmit = this.el.querySelector('.reviews__modal-submit');

        // input по которому открывается модалка для написания отзыва
        this.inputControll = this.el.previousElementSibling;

        this.counter = this.el.querySelector('.reviews__counter').firstElementChild;

        // модалки с результатом отправки отзыва
        this.resultModals = {
            review: this.el.querySelector('.reviews__modal'),
            success : this.el.querySelector('.reviews__modal-success'),
            error : this.el.querySelector('.reviews__modal-error'),
        }

        this.activeWinModal = null; // активное окно модалки
        this.submitIsActive = false; // активна ли кнопка отправить
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

    // открывает нужное (переданное) окно модалки
    openWindowModal(name) {
        this.closeWindowModal();
        this.activeWinModal = this.resultModals[name];
        this.activeWinModal.classList.add('reviews__modal_active');
    }

    // закрывает только активное окно модалки (без подложки)
    closeWindowModal() {
        if(this.activeWinModal) this.activeWinModal.classList.remove('reviews__modal_active');
        this.activeWinModal = null;
    }

    /**
     * @description Закрывает модалку полностью
     * */ 
    closeModal() {
        this.inputControll.checked = false;
        this.closeWindowModal();
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
    /**
     * @description Устанавливает инпут не валидным и устанавливает ошибку
     * */ 
    setInvalidInput(input, textError) {
        const parent = input.parentElement;
        const error = input.previousElementSibling;
        input.setCustomValidity(textError);

        parent.setAttribute('invalid', '');
        error.textContent = textError;
    }
    /**
     * @description Снимает невалидность с инпут
     * */ 
    removeInvalidInput(input) {
        const parent = input.parentElement;
        const error = input.previousElementSibling;

        input.setCustomValidity('');

        parent.removeAttribute('invalid');
        error.textContent = '';
    }

    /**
     * @description Показывает ошибку невалидности звезд
     * */ 
    setInvalidStars() {
        this.starsError.setAttribute('invalid', '');
    }
    /**
     * @description Убирает ошибку невалидности звезд
     * */ 
    removeInvalidStars() {
        this.starsError.removeAttribute('invalid', '');
    }

    disableButtonSubmit() {
        if(this.buttonSubmit.classList.contains('reviews__modal-submit_active')) {
            this.buttonSubmit.classList.remove('reviews__modal-submit_active');
            this.submitIsActive = false;
        }
    }

    enableButtonSubmit() {
        if(!this.buttonSubmit.classList.contains('reviews__modal-submit_active')) {
            this.buttonSubmit.classList.add('reviews__modal-submit_active');
            this.submitIsActive = true;
        }
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
}