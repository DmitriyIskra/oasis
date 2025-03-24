export default class HandlersForModalsMenuAccount {
    // хендлер на самый первый попап где есть выбор вход или регистрация
    auth(e) {
        if(e.target.closest('.dialog__button-login')) {
            this.modals.closeModal();

            // прикрепляем контекст
            this.activeHandler = this.handlers.login.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                this.activeModal = await this.modals.getModal('auth', 'login');
                this.modals.showModal();
            })()
        }

        if(e.target.closest('.dialog__button-reg')) {
            this.modals.closeModal();
            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                this.activeModal = await this.modals.getModal('auth', 'reg1');
                this.modals.showModal();
            })()
        }
    }

    login(e) {
        if(e.target.closest('.dialog__button-login')) {
            const inputs = [...this.activeModal.querySelectorAll('input[required]')];
            const resultFill = this.validation.validationRequiredInputs(inputs);

            // Проверка полей на заполненность
            if(Boolean(resultFill.length)) {
                resultFill.forEach(input => this.modals.redraw.setError(
                    input, 'Поле обязательно для заполнения'
                    ));

                return;
            }


        }
    }

    focus(e) {
        if(e.target.closest('input[required]')) {
            const input = e.target.closest('input[required]');
            if(input.validity.customError) this.modals.redraw.removeError(input);
        }
    }
}