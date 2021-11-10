/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
(function () {
    var modal = document.getElementById("form-modal");
    // sucess modal
    var modalSuccess = document.getElementById("success-modal");

    if(!modal) return;

    var btn = document.querySelectorAll('.btn--modal');
    var btnSuccess = document.querySelectorAll('.btn--success');

    var close = modal.querySelector('.close');
    // close success
    var closeSucess = modalSuccess.querySelector('.close');


    function stopScrolling() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
    }

    function resumeScrolling() {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
    }


    btn.forEach(item => item.addEventListener('click', (function (e) {
        e.preventDefault();
        modal.classList.add('modal__show');
        stopScrolling();
    })));

    // to show success modal
    btnSuccess.forEach(item => item.addEventListener('click', (function (e) {
        e.preventDefault();
        modalSuccess.classList.add('modal__show');
        stopScrolling();
    })));

    close.addEventListener('click', (function (e) {
        e.preventDefault();
        modal.classList.remove('modal__show');
        resumeScrolling();
    }));

    // to hide success modal
    closeSucess.addEventListener('click', (function (e) {
        e.preventDefault();
        modalSuccess.classList.remove('modal__show');
        resumeScrolling();
    }));

    window.addEventListener('click', (function (e) {
        if (e.target === modal) {
            modal.classList.remove('modal__show');
            resumeScrolling();
        }
    }));


}());

(function(){

    // Добавление/удаление модификаторов при клике на переключение видимости
    var toggler = document.getElementById('main-nav-toggler');
    if(toggler){
        toggler.addEventListener('click', mainNavVisibleToggle);

        function mainNavVisibleToggle(e) {
            e.preventDefault();
            toggler.classList.toggle('burger--close'); // модификатор иконки (должен быть .burger)
            document.getElementById('main-nav').classList.toggle('main-nav--open');
        }
    }

  // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
  var linkClassName = 'main-nav__link';
  var linkClassNameShowChild = 'main-nav__item--show-child';
  var findLinkClassName = new RegExp(linkClassName);
  // Слежение за всплывшим событием focus (нужно добавить класс, показывающий потомков)
  document.addEventListener('focus', (function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Добавим классы, показывающие списки вложенных уровней, на всех родителей
      var parents = getParents(event.target, '.main-nav__item');
      for (var i = 0; i < parents.length; i++) {
        parents[i].classList.add(linkClassNameShowChild);
      }
    }
  }), true);
  // Слежение за всплывшим событием blur (нужно убрать класс, показывающий потомков)
  document.addEventListener('blur', (function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Уберем все классы, показывающие списки 2+ уровней
      var parents = document.querySelectorAll('.'+linkClassNameShowChild)
      for (var i = 0; i < parents.length; i++) {
        parents[i].classList.remove(linkClassNameShowChild);
      }
    }
  }), true);



  // eslint-disable
  /*! getParents.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getParents */
  /**
   * Get all of an element's parent elements up the DOM tree
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Array}           The parent elements
   */
  var getParents = function ( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line
          return i > -1;
        };
    }

    // Setup parents array
    var parents = [];

    // Get matching parent elements
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

      // Add matching parents to array
      if ( selector ) {
        if ( elem.matches( selector ) ) {
          parents.push( elem );
        }
      } else {
        parents.push( elem );
      }

    }

    return parents;

  };

}());
