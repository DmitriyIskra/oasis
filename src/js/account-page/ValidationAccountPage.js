export default class ValidationAccountPage {
    // валидирует инпуты на заполненность
    // возвращает массив не заполненных элементов
    validationRequiredInputs(elements) {
        const elNoValid = elements.filter(el => !el.value);

        return elNoValid;
    }

    // возвращает Bool
    validationCheckbox(el) {
        return el.checked;
    }

    // возвращает Bool
    validationEmail(el) {
        return !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+\.[A-Za-z]{2,4}$/i.test(el.value);
    }
}