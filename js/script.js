'use strict';
window.addEventListener('DOMContentLoaded', function () {
    const cards = require('./modules/cards'),
          calc = require('./modules/clac'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    cards();
    calc();
    forms();
    modal();
    slider();
    tabs();
    timer();
})