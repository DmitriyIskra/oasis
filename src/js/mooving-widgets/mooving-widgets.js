
/**
 * @description при достижении скрола определенного занчения
 * @description фиксируем виджеты
 * 
 * @param widgets элемент в котором 2 виджета (wrapper)
 * */ 
export default function moovingWidgets(widgets) {
    document.addEventListener('scroll', (e) => {
        if(scrollY >= 799) {
            if(widgets.style.position = 'absolute') {
                widgets.style.position = 'fixed';
            }
        } else {
            if(widgets.style.position = 'fixed') {
                widgets.style.position = 'absolute';
            }
        }
    })
}