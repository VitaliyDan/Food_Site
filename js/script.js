'use strict';
window.addEventListener('DOMContentLoaded', function () {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = ''; //set your day

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTimgaltimgrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTimgaltimgrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimgaltimgimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
    const modalTimgaltimgimerId = setTimeout(openModal, 10000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //Slider
    const slides = document.querySelectorAll('.offer__slide'),
        offerSlider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.slider-inner');
    let slideIndex = 1, offset = 0;

        function check() {
            if (slides.length < 10) {
                total.textContent = `0${slides.length}`;
                current.textContent = `0${slideIndex}`;
            } else {
                total.textContent = slides.length;
                current.textContent = slideIndex;
            }
        }check();

    slidesField.style.width = 100 * slides.length + '%';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicator = document.createElement('ol'),
        dots=[];
        indicator.classList.add('butIndicator');
        offerSlider.append(indicator);
    for(let i=0; i<slides.length; i++){
        let dot = document.createElement('li');
        dot.setAttribute('data-slide', i + 1);
        if(i==0){dot.style.opacity = 1};
        indicator.append(dot);
        dots.push(dot);
    }
   


    function dotsPush(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };
    function checkSlider(){
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        } 
    };
    function clickONSlider(){
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        checkSlider();
        dotsPush();
    }
    next.addEventListener('click', () => {
        clickONSlider();
    });
        
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }     
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        checkSlider(); 
        dotsPush();
    });
    dots.forEach(dot => {
     dot.addEventListener('click', (e)=>{
        const slideTo = e.target.getAttribute('data-slide');
        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dotsPush();
        checkSlider(); 
     });
    });
    function autoSlider(){
        setTimeout(() => {
            check();
            clickONSlider();
            autoSlider();
        }, 4000);
    }  autoSlider();

    // Menu on daily

    class MenuCard {
        constructor(src, altimg, title, descr, price, parentSelector) {
            this.src = src;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    // request GET
    async function getRequest(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`bad request on ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                src,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(src, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // forms

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
        openModal();
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
            closeModal();
        }, 2000);
    }
})