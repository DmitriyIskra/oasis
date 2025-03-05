export default class RedrawAccountPageProfile {
    constructor(screen) {
        this.screen = screen;

        // Форма
        this.form = this.screen.querySelector('form');
        // Заблокированные поля
        this.disabledInputs = [...this.screen.querySelectorAll('input[disabled]')];
        // текстовые инпуты
        this.requiredInputs = [...this.screen.querySelectorAll('.label-input__input[required]')];

        // Поля для email
        this.emailInputs = this.screen.querySelector('.label-input__input[name="email"]');
        
        this.buttonSave = this.screen.querySelector('.acc-user__button-save');
        this.buttonEdit = this.screen.querySelector('.acc-user__button-edit');
        this.buttonDelete = this.screen.querySelector('.acc-user__button-delete');
    }

    // Разблокирует поля для редактирования
    enableProfile() {
        this.disabledInputs.forEach(input => input.removeAttribute('disabled'));

        this.requiredInputs[0].focus();
        this.buttonSave.removeAttribute('disabled');
    }

    // Блокирует поля для редактирования
    disableProfile() {
        this.disabledInputs.forEach(input => input.setAttribute('disabled', ''));

        this.buttonSave.setAttribute('disabled', '');
    }

    // ОШИБКИ при валидации обязательных полей
    setError(el, textError) {
        const parent = el.parentElement;
        const elError = el.previousElementSibling;

        parent.setAttribute('invalid', '');
        el.setCustomValidity('error');
        elError.textContent = textError;
    }

    removeError(el) {
        const parent = el.parentElement;
        const elError = el.previousElementSibling;

        parent.removeAttribute('invalid');
        el.setCustomValidity('');
        elError.textContent = '';
    }


}