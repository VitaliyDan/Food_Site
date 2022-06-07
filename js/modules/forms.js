import {closeModal, openModal} from './modal';
function forms(modalTimerId){
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        BindPost(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });
        return await res.json();
    };

    function BindPost(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const request = new XMLHttpRequest();  // oldest version <---
            // request.open('POST', 'server.php');    // oldest version <---
            let statusMessage = document.createElement('img');
            statusMessage.classList.add('img_form');
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading;
            //  form.append(statusMessage); // crash last form. fix code --->
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // Transform in json 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showResponseModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showResponseModal(message.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

    function showResponseModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal('.modal',modalTimerId);
        const createModal = document.createElement('div');
        createModal.classList.add('modal__dialog');
        createModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(createModal);
        setTimeout(() => {
            createModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal('.modal');
        }, 2000);
    }
}
export default forms;