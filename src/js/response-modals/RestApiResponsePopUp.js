export default class RestApiResponsePopUp {
    async read(dir, name) {
        try {
            // если name не передан то этой части url не будет сформировано
            const path = './modals/' + dir + '/modal-' + dir + `${name ? `-${name}` : ''}` + '.html'; 

            const response = await fetch(path, {
                headers: {
                    'Content-Type' : 'text/html',
                }
            });
        
            const data = await response.text();
        
            const reader = new DOMParser();
            const html = reader.parseFromString(data, 'text/html');
            
            return html;
        } catch (error) {
            throw new Error(
                'Запрос на получение pop-up завершился ошибкой' + '\n' + error
            )
        }
    }
}