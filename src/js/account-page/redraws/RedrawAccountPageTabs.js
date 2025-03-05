export default class RedrawAccountPageTabs {
    constructor(tabs, screensWrapper) {
        this.tabs = tabs;
        this.screensWrapper = screensWrapper;
    }

    switchingTabs(target) {
        const activeTab = this.tabs.querySelector('.account__ctrl-item_active');

        activeTab.classList.remove('account__ctrl-item_active');
        target.classList.add('account__ctrl-item_active');
    }

    switchingScreen(type) {
        const activeScreen = this.screensWrapper.querySelector('.account__screen-item_active');
        const nextScreen = this.screensWrapper.querySelector(`.account__screen-item[data-screen="${type}"]`);

        activeScreen.classList.remove('account__screen-item_active');
        nextScreen.classList.add('account__screen-item_active');
    }
}