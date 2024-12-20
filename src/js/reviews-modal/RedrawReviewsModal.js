export default class RedrawReviewsModal {
    constructor(el) {
        this.el = el;
this.swit = document.querySelector('#switcher-reviews-modal');
        this.stars = [...this.el.querySelectorAll('.reviews__modal-star')];
    }

    choiceStars(star) {
        const num = +star.dataset.num;
        this.stars.forEach(star => {
            if(+star.dataset.num <= num) {
                star.classList.add('reviews__stars_active');
                console.log(star)

                return;
            }

            star.className = 'reviews__modal-star';
        })
    }
}