## НАВИГАЦИИ компоненты
- components/nav-bar-mobile - управление каталогом в мобильной версии, находится внизу экрана
- components/nav-catalog - появляющееся меню с каталогом в десктопной версии по клику на "Каталог" в хедере 
- components/nav-mobile - появляющееся меню c навигацией, открывается по клику по иконке бургер в хедере 

## КАТАЛОГ
- В десктоп открывается по чекбоксу #controll-catalog
находится components/nav-catalog

## nav-mobile
- Мобильная версия навигации (не каталог) открывается по чекбоксу #nav-mobile, находящемуся в layout/layout


## Каталог и мобильная навигация взаимо исключают друг друга
- Если открывается мобильная навигация, то каталог закрывается функция js/header/nav-mobileButton.js
- Если открывается каталог, то мобильная навигация закрывается класс js/burger-menu/RedrawBurger.js => 
  метод openNav()

## POP UP для аккаунт и корзины
- используется отдельный класс (папка response-modals) который имеет метод registerHandlerOnClick(eventName, method)
  данный метод принимет другой метод с привязанным контекстом и необходимой функциональностью
  и при формировании модального окна вешает его на слушатель событий модального окна

https://dmitriyiskra.github.io/oasis/product-card-tea.html
https://dmitriyiskra.github.io/oasis/product-card-coffee.html
https://dmitriyiskra.github.io/oasis/product-card-syrups.html
https://dmitriyiskra.github.io/oasis/product-card-milk.html
https://dmitriyiskra.github.io/oasis/product-card-alternative-milk.html
https://dmitriyiskra.github.io/oasis/product-card-water.html
https://dmitriyiskra.github.io/oasis/product-card-carbonated-drink.html
https://dmitriyiskra.github.io/oasis/product-card-dishes.html
https://dmitriyiskra.github.io/oasis/product-card-fridge.html
https://dmitriyiskra.github.io/oasis/product-card-dishes-sets.html
https://dmitriyiskra.github.io/oasis/product-card-hot-chocolate.html
https://dmitriyiskra.github.io/oasis/product-card-milk-system-cleaner.html
https://dmitriyiskra.github.io/oasis/product-card-t-short.html
https://dmitriyiskra.github.io/oasis/product-card-broths.html
https://dmitriyiskra.github.io/oasis/product-card-coffee-machines.html



## ОСтановился, уточнения


## УТОЧНЕНИЯ
в попап с подтверждением номера тупик, Нужен popup для восстановления пароля (макет) 
?? Вы успешно зарегистрировались в личном кабинете
показываем это на странице где юзер находится или переадресовываем в кабинет, 
если переадресовываем зачем тогда попап, после попап юзер уже залогинен или нет,
если залогинен тогда можно добавить кнопку в кабинет, если не логиним тогда кнопку войти и ткрываем попап войти
Переставить таймер

## ДОРАБОТАТЬ
-- Сделать вызов popup для восстановления пароля

-- АККАУНТ и КОРЗИНА Сделать проверку на формы в новых модалках и страницах аккаунт и корзина




 

https://dmitriyiskra.github.io/oasis/product-card-tea.html - карточка чай
https://dmitriyiskra.github.io/oasis/src/pug/product-card-t-short.pug - карточка футболка
https://dmitriyiskra.github.io/oasis/product-card-coffee-machines.html - карточка кофемашина
https://dmitriyiskra.github.io/oasis/catalog.html' - общий каталог
https://dmitriyiskra.github.io/oasis/brands.html - список карточек по брендам
https://dmitriyiskra.github.io/oasis/products-list.html - список карточек товаров по бренду и типу
https://dmitriyiskra.github.io/oasis/requisites.html -  реквизиты
https://dmitriyiskra.github.io/oasis/404.html - 404
https://dmitriyiskra.github.io/oasis/loyalty-program.html - Программа лояльности

