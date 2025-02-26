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


## ЗАМЕТКИ
-- АККАУНТ и КОРЗИНА Сделать проверку на формы в новых модалках и страницах аккаунт и корзина

-- МОДАЛКИ НОВЫЕ вызов новых модалок