
/**
 * @description По клику на крестик или затемненный 
 * фон закрывается окно с результатом отправки отзыва
 * !!! Функция работает только на модалки для результата отправки отзыва
 * @param arr - массив модалок
 * */ 
export default function closeReviewsResponseModal(arr) {
    let elArr = arr;
    if(!Array.isArray(arr)) elArr = Array.from(arr);

    const handler = (e) => {
        console.log('close')
        if(e.target.closest('.reviews__modal-close') ||
        e.target.matches('.reviews__response-cover')) {
          const modal =  e.target.closest('.reviews__response-cover'); 
          modal.classList.remove('reviews__response_active');
        };
    }

    elArr.forEach(el => {
        el.addEventListener('click', handler);
    })
}