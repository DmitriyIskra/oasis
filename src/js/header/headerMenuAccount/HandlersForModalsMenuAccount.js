export default class HandlersForModalsMenuAccount {
    constructor() {
        this.timeForTimer = 30;
    }

    // хендлер на самый первый попап где есть выбор вход или регистрация
    async auth(e) {
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
            this.activeModal = await this.modals.getModal('auth', 'login');
            this.modals.showModal(false);

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
            this.activeModal = await this.modals.getModal('auth', 'reg1');
            this.modals.showModal(false);
        }
    }
    // попап входа в аккаунт
    async login(e) {
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
    async registration1(e) {
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
            // klusdfv!34F - пароль для тестов валидации
            // Есть по крайней мере одна ошибка 
            if(Boolean(isAnyErrors.length)) return;
            
            const form = this.activeModal.querySelector('form');
            const formData = new FormData(form);

            const objData = Object.fromEntries(formData);

            // Сохраняем значение
            this.storage.userData = objData;

            this.modals.closeModal(false);

            // прикрепляем контекст
            this.activeHandler = this.handlers.registration2.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.change.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('change', this.activeHandler);

            // собираем новый попап
            this.activeModal = await this.modals.getModal('auth', 'reg2');

            // заполняем поля, на случай если пользователь возвращался к первой форме
            if(this.storage.userData) {
                const userData = this.storage.userData;
                const inputsNewPopUp = [...this.activeModal.querySelectorAll('input[type="text"]')];
                inputsNewPopUp.forEach(item => item.value = userData[item.name] ?? '');
            }

            // Включаем стрелку назад в шапке попапа
            this.modals.redraw.showArrowBack();
            // вешаем маску на поле с телефоном
            const elTel = this.activeModal.querySelector('input[name="phone"]');
            this.modals.redraw.addIMask(elTel);

            this.modals.showModal(false);
        }
    }

    // второй попап регистрации
    async registration2(e) {
        if(e.target.closest('.dialog__button-next')) {
            const inputs = [...this.activeModal.querySelectorAll('input[type="text"][required]')];

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

            // Проверка почты на корректность ввода
            const elEmail = this.activeModal.querySelector('input[name="email"]')
            if(elEmail.value) {
                const resultValidEmail = this.validation.validationEmail(elEmail.value);

                if(!resultValidEmail) {
                    this.modals.redraw.setError(
                        elEmail, 'Некорректное значение email'
                    );

                    isAnyErrors.push(true);
                }
            }

            // Проверка телефона
            const elPhone = this.activeModal.querySelector('input[name="phone"]')
            if(elPhone.value) {
                const resultValidPhone = this.validation.validationPhone(elPhone.value);

                if(!resultValidPhone) {
                    this.modals.redraw.setError(
                        elPhone, 'Некорректное значение телефон'
                    );

                    isAnyErrors.push(true);
                }
            }

            // Проверка чекбокса о персональных данных
            const elPersData = this.activeModal.querySelector('input[type="checkbox"][required]')
            const resultPersData = this.validation.validationCheckbox(elPersData);
            if(!resultPersData) {
                this.modals.redraw.setError(elPersData);

                isAnyErrors.push(true);
            }

            // Есть по крайней мере одна ошибка 
            if(Boolean(isAnyErrors.length)) return;

            const form = this.activeModal.querySelector('form');
            
            // Собираем данные, обновляем в storage и заполняем formData перед отправкой на сервер
            let formData = new FormData(form);
            this.storage.userData = Object.fromEntries(formData);
            const userData = Object.entries(this.storage.userData);
            userData.forEach(item => formData.set(item[0], item[1]));

            try {
                const response = await this.restApi.registration.create(formData);

                this.modals.closeModal(false);

                if(!response) {
                    this.activeModal = await this.modals.getModal('fail', '');
                    this.modals.showModal(false);

                    return;
                }

                // прикрепляем контекст
                this.activeHandler = this.handlers.checkPhone.bind(this);
                // прокидываем ручку в класс с попап, для дальнейшей регистрации на актуальном поп ап
                this.modals.saveHandler('click', this.activeHandler);

                // прикрепляем контекст
                this.activeHandler = this.handlers.focus.bind(this);
                // прокидываем ручку в класс с попап, для дальнейшей регистрации на актуальном поп ап
                this.modals.saveHandler('focus', this.activeHandler);

                // показываем соответствующую результату выполнения отправки данных на сервер pop up
                this.activeModal = await this.modals.getModal('auth', 'check-phone');

                // Включаем стрелку назад в шапке попапа
                this.modals.redraw.showArrowBack();

                this.modals.showModal(false);
                
                this.modals.redraw.startTimer(this.activeModal, this.handlers.timeForTimer);
            } catch (error) {
                throw new Error('Ошибка отправки данных \n', error);
            }
        }
    
        if(e.target.closest('.dialog__back')) {
            // Собираем данные и отправляем в storage
            const form = this.activeModal.querySelector('form');
            const formData = new FormData(form);
            this.storage.userData = Object.fromEntries(formData);

            this.modals.closeModal(false);
            // Открываем и запоняем попап reg1 
            const userData = this.storage.userData;

            // прикрепляем контекст
            this.activeHandler = this.handlers.registration1.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // показываем соответствующую результату выполнения отправки данных на сервер pop up
            this.activeModal = await this.modals.getModal('auth', 'reg1');

            // заполняем поля
            const inputs = [...this.activeModal.querySelectorAll('input')];
            inputs.forEach(item => item.value = userData[item.name]);
            
            this.modals.showModal(false);

        }
    }

    async checkPhone(e) {
        if(e.target.closest('.dialog__button-send')) {
            const input = [this.activeModal.querySelector('input[type="text"]')];
            // Проверка полей на заполненность (получаем не заполненные поля)
            const resultFill = this.validation.validationRequiredInputs(input);
            // Установка ошибок на не заполненные поля
            if(Boolean(resultFill.length)) {
                resultFill.forEach(input => this.modals.redraw.setError(
                    input, 'Поле обязательно для заполнения'
                ));

                return;
            }

            const form = this.activeModal.querySelector('form');
            const formData = new FormData(form);
            formData.set('phone', this.storage.userData.phone);
            console.log(Object.fromEntries(formData))
            const response = await this.restApi.phone.create(formData);

            
            if(!response) {
                const input = form.code;
                this.modals.redraw.setError(
                    input, 'Некорректно введен код'
                )

                return;
            }

            location = './account.html';
        }

        if(e.target.closest('.dialog__button-repeat')) {
            this.modals.redraw.startTimer(this.activeModal, this.handlers.timeForTimer, true);
        }

        if(e.target.closest('.dialog__back')) {
            this.modals.closeModal(false);

            // прикрепляем контекст
            this.activeHandler = this.handlers.registration2.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('click', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.focus.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('focus', this.activeHandler);

            // прикрепляем контекст
            this.activeHandler = this.handlers.change.bind(this);
            // прокидываем ручку в класс с поп ап, для дальнейшей регистрации на актуальном поп ап
            this.modals.saveHandler('change', this.activeHandler);

            // собираем новый попап
            this.activeModal = await this.modals.getModal('auth', 'reg2');

            // заполняем поля, на случай если пользователь возвращался к первой форме
            if(this.storage.userData) {
                const userData = this.storage.userData;
                const inputsNewPopUp = [...this.activeModal.querySelectorAll('input[type="text"]')];
                inputsNewPopUp.forEach(item => item.value = userData[item.name] ?? '');
            }

            // Включаем стрелку назад в шапке попапа
            this.modals.redraw.showArrowBack();
            // вешаем маску на поле с телефоном
            const elTel = this.activeModal.querySelector('input[name="phone"]');
            this.modals.redraw.addIMask(elTel);

            this.modals.showModal(false);
        }
    }

    async logout(e) {
        if(e.target.closest('.dialog__button-cancel')) {
            this.modals.closeModal();
        }

        if(e.target.closest('.dialog__button-logout')) {
            const response = await this.restApi.logout.read();

            if(!response) {
                this.modals.closeModal(false);
                this.activeModal = await this.modals.getModal('fail', '');
                this.modals.showModal(false);

                return;
            }

            if(location.pathname.includes('account')) location = '/';
            if(!location.pathname.includes('account')) location.reload();
        }
    } 

    focus(e) {
        if(e.target.closest('input[required]')) {
            const input = e.target.closest('input[required]');
            if(input.validity.customError) this.modals.redraw.removeError(input);
        }
    }

    change(e) {
        if(e.target.closest('input[type="checkbox"][required]')) {
            const el = e.target.closest('input[type="checkbox"][required]');
            if(el.validity.customError) this.modals.redraw.removeError(el)
        }
    }
}

