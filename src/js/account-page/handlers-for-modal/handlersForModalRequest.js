export default class HandlersModalRequest {
    
    // МЕТОДЫ ДЛЯ ПРОБРАСЫВАНИЯ В КЛАСС С МОДАЛКАМИ
    
    // ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ АККАУНТА
    deleteAcc(e) {
        // УДАЛИТЬ АККАУНТ (УДАЛИТЬ ОТМЕНА)
        if(e.target.closest('.dialog__button-send')) {
            (async () => {
                const resp = await this.restApi.profile.delete();
                this.modals.closeModal(false);

                if(resp) {
                    this.activeHandler = this.handlers.deleteAccSuccess.bind(this);
                    this.modals.saveHandler('click', this.activeHandler);
                    this.activeModal = await this.modals.getModal('account', 'success-delete-profile');
                } else {
                    this.activeModal = await this.modals.getModal('fail');
                }

                this.modals.showModal();
            })()
        }

        // отменить удаление аккаунта
        if(e.target.closest('.dialog__button-cancel')) {
            this.modals.closeModal();
        }

    }

    deleteAccSuccess(e) {
        // ПОФИЛЬ УДАЛЕН УСПЕШНО
        // редирект при клике на кнопку на главную 
        if(e.target.closest('.dialog__button_redirect')) {
            location.href = '/';
        }
    }
}