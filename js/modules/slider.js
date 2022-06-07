function slider(){
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
    if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.replace(/\D/g, '');
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
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(/\D/g, '');
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
    offset = +width.replace(/\D/g, '') * (slideTo - 1);
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
}
export default slider;