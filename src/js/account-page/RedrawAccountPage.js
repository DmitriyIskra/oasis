export default class RedrawAccountPage {
    constructor(ctrl, screens) {
        this.ctrl = ctrl;
        this.screens = screens;
    }

    switchingCtrl(target) {
        const activeCtrl = this.ctrl.querySelector('.account__ctrl-item_active');

        activeCtrl.classList.remove('account__ctrl-item_active');
        target.classList.add('account__ctrl-item_active');
    }

    switchingScreen(type) {
        const activeScreen = this.screens.querySelector('.account__screen-item_active');
        const nextScreen = this.screens.querySelector(`.account__screen-item[data-screen="${type}"]`);

        activeScreen.classList.remove('account__screen-item_active');
        nextScreen.classList.add('account__screen-item_active');
    }
}