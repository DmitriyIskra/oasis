export default class RedrawResponsePopUp {
    constructor() {
        this.dialog = document.querySelector('dialog');
        this.wrContentDialog = this.dialog.querySelector('.dialog__content');
        this.buttonBack = this.dialog.querySelector('.dialog__back');
        this.buttonClose = this.dialog.querySelector('.dialog__close');
    }

    showModal() {
        document.body.style.overflow = 'hidden';
        this.dialog.showModal()
    }

    closeModal() {
        if(this.buttonBack.classList.contains('dialog__back_active')) {
            this.buttonBack.classList.remove('dialog__back_active')
        }

        document.body.style.overflow = '';
        this.clearContent();
        this.dialog.close();
    }

    clearContent() {
        [...this.wrContentDialog.children].forEach(el => el.remove());
    }
}