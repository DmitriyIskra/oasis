export default class HandlersForModalsMenuAccount {
    // хендлер на самый первый попап где есть выбор вход или регистрация
    auth(e) {
        if(e.target.closest('.dialog__button-login')) {
            this.modals.closeModal(false);

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
                this.modals.showModal(false);
            })()
        }

        if(e.target.closest('.dialog__button-reg')) {
            this.modals.closeModal(false);

            // прикрепляем контекст
            this.activeHandler = this.handlers.registration1.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                this.activeModal = await this.modals.getModal('auth', 'reg1');
                this.modals.showModal(false);
            })()
        }
    }
    // попап входа в аккаунт
    login(e) {
        // вход в аккаунт
        if(e.target.closest('.dialog__button-login')) {
            const inputs = [...this.activeModal.querySelectorAll('input[required]')];

            // Проверка полей на заполненность
            const resultFill = this.validation.validationRequiredInputs(inputs);
            
            // Установка ошибок на не заполненные поля
            if(Boolean(resultFill.length)) {
                resultFill.forEach(input => this.modals.redraw.setError(
                    input, 'Поле обязательно для заполнения'
                ));

                return;
            }
            
            const form = this.activeModal.querySelector('form');
            const formData = new FormData(form);
            
            (async () => {
                try {
                    const response = await this.restApi.login.create(formData);
                    
                    if(!response) {
                        this.modals.redraw.setError(inputs[0], 'Неверный логин');
                        this.modals.redraw.setError(inputs[1], 'Неверный пароль');
                        return;    
                    }

                    location.href = './account.html';
                } catch (error) {
                    console.error('Запрос на вход в аккаунт завершился ошибкой: \n', error);
                }
            })()
        }

        // Восстановление пароля
        if(e.target.closest(".dialog__forget-link")) {
            // this.modals.closeModal(false);
            // // показываем соответствующую результату выполнения отправки данных на сервер pop up
            // (async () => {
            //     this.activeModal = await this.modals.getModal('auth', 'reg1');
            //     this.modals.showModal(false);
            // })()
        }
    }

    // первый попап регистрации
    registration1(e) {
        if(e.target.closest('.dialog__button-next')) {
            const inputs = [...this.activeModal.querySelectorAll('input[required]')];

            // Проверка полей на заполненность (получаем не заполненные поля)
            const resultFill = this.validation.validationRequiredInputs(inputs);
            
            // Есть ли хоть одна ошибка
            const isAnyErrors = [];

            // Установка ошибок на не заполненные поля
            if(Boolean(resultFill.length)) {
                resultFill.forEach(input => this.modals.redraw.setError(
                    input, 'Поле обязательно для заполнения'
                ));

                isAnyErrors.push(true);
            }

            // Проверка пароля на соответствие требованиям:
            // Пароль должен содержать не менее 8 символов.
            // Одна заглавная и одна строчная буква. 
            // Минимум 1 цифра.
            // Наличие символов
            const elPass = this.activeModal.querySelector('.dialog__pass');
            if(elPass.value) {
                const resultPass = this.validation.validationPassword(elPass.value);
                if(!resultPass) {
                    this.modals.redraw.setError(
                        elPass, 'Введенный пароль не соответствует требованиям'
                    );
    
                    isAnyErrors.push(true);
                }

                if(resultPass) {
                    const elPassR = this.activeModal.querySelector('.dialog__pass_r');
                    const resultSamePass = this.validation.isSamePasswords(elPass.value, elPassR.value);
                    if(!resultSamePass) {
                        this.modals.redraw.setError(elPass, 'Пароли должны совпадать');
                        this.modals.redraw.setError(elPassR, 'Пароли должны совпадать');

                        isAnyErrors.push(true);
                    }
                }
            }
// klusdfv!34F - пароль для тестов
            // Есть по крайней мере одна ошибка 
            if(Boolean(isAnyErrors.length)) return;
            
            const form = this.activeModal.querySelector('form');
            const formData = new FormData(form);
            sessionStorage.dataReg = JSON.stringify(Object.fromEntries(formData));
            

            this.modals.closeModal(false);

            // прикрепляем контекст
            this.activeHandler = this.handlers.registration2.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            (async () => {
                this.activeModal = await this.modals.getModal('auth', 'reg2');
                this.modals.showModal(false);
            })()

        }
    }

    // второй попап регистрации
    registration2(e) {
        console.log('reg2')
    }

    focus(e) {
        if(e.target.closest('input[required]')) {
            const input = e.target.closest('input[required]');
            if(input.validity.customError) this.modals.redraw.removeError(input);
        }
    }
}