export default class ControllReviewsModal {
    constructor(redraw) {
        this.redraw = redraw;
        
        this.click = this.click.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.redraw.el.addEventListener('click', this.click);
    }

    click(e) {
        e.preventDefault();

        if(e.target.matches('.reviews__modal-star')) {
            this.redraw.choiceStars(e.target.closest('.reviews__modal-star'));
        }
        if(e.target.closest('.reviews__modal-close')) {
            console.log('close')
            console.log(this.redraw.swit.checked)
        }
    }
}