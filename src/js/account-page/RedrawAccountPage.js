export default class RedrawAccountPage {
    constructor(ctrl, screensWrapper) {
        this.ctrl = ctrl;
        this.screensWrapper = screensWrapper;

        this.screens = {
            profile: this.screensWrapper.children[0],
            address: this.screensWrapper.children[1],
            history: this.screensWrapper.children[2],
            favorites: this.screensWrapper.children[3],
            loyalty: this.screensWrapper.children[4],
        }

        // PROFILE
        this.profileReqInput = [...this.screens.profile.querySelectorAll('.label-input__input[required]')];
        this.profileReqEmail = [...this.screens.profile.querySelectorAll('.label-input__input[name="email"]')];
        this.profileReqCheck = [...this.screens.profile.querySelectorAll('input[type="checkbox"][required]')];

        this.profileButtonSave = this.screens.profile.querySelector('.acc-user__button-save');
        this.profileButtonEdit = this.screens.profile.querySelector('.acc-user__button-edit');
        this.profileButtonDelete = this.screens.profile.querySelector('.acc-user__button-delete');
    }

    switchingCtrl(target) {
        const activeCtrl = this.ctrl.querySelector('.account__ctrl-item_active');

        activeCtrl.classList.remove('account__ctrl-item_active');
        target.classList.add('account__ctrl-item_active');
    }

    switchingScreen(type) {
        const activeScreen = this.screensWrapper.querySelector('.account__screen-item_active');
        const nextScreen = this.screensWrapper.querySelector(`.account__screen-item[data-screen="${type}"]`);

        activeScreen.classList.remove('account__screen-item_active');
        nextScreen.classList.add('account__screen-item_active');
    }

    // PROFILE
    enableProfile() {
        this.profileReq.forEach(input => {
            input.removeAttribute('disabled');
        })

        this.profileReq[0].focus();
        this.profileButtonSave.removeAttribute('disabled');
    }

    disableProfile() {
        this.profileReq.forEach(input => {
            input.setAttribute('disabled', '');
        })

        this.profileButtonSave.setAttribute('disabled', '');
    }

    // ОШИБКИ при валидации обязательных полей
    setError(el, textError) {

    }

    removeError(el) {

    }
}