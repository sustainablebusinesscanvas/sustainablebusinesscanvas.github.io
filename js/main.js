/*! project-name v0.0.1 | (c) 2020 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
(function () {
  // disable on mobile
  if (window.matchMedia("(max-width: 767px)").matches) return;

// ================= helper.js
  const add = function(_num1, _num2) {
    var solution = _num1 + _num2;
    return solution;
  };

// returns the width and height of the window
  const getWDs = function() {
    return {
      h: window.innerHeight || document.documentElement.clientHeight,
      w: window.innerWidth || document.documentElement.clientWidth
    };
  };

// returns if a big section is in focus of the window or not -- dependent on getWDs function
  const inFocus = function(el) {
    let rect = el.getBoundingClientRect();
    let turnPointY = getWDs().h / 2;
    let turnPointX = getWDs().w / 2;
    let elInFocus = false;
    let inY = (rect.top <= turnPointY && rect.top >= 0) || (rect.bottom <= getWDs().h && rect.bottom >= turnPointY) || (rect.top <= 0 && rect.bottom >= turnPointY);
    let inX =  ((rect.left < turnPointX && rect.left >= 0) || (rect.right < getWDs().w && rect.right > turnPointX));

    if (inX && inY){
      elInFocus = true;
    }

    return elInFocus;
  };

  const scrollWindow = function(_target, _label, _speed) {
    let scene = eval(_target.dataset.scene);
    let timeline = eval(_target.dataset.timeline);
    let timelineDuration = timeline.duration();
    let tlLabel = 'timeline.labels.'+ _label;
    let labelTime = eval(tlLabel);
    let nMTime = 0;
    if (timelineDuration != labelTime && labelTime != undefined) {
      nMTime = labelTime / getRatio(scene.duration(), timeline.duration());
    } else {
      nMTime =  timeline.duration() / getRatio(scene.duration(), timeline.duration())
    }
    let scrollLoc = scene.scrollOffset() + nMTime;
    gsap.to(window, _speed, { scrollTo: { y: scrollLoc } });
  };

  const  getRatio = function(_num1, _num2) {
    var theRatio = 1;
    if (_num1 > _num2) {
      theRatio = _num2 / _num1;
    } else {
      theRatio = _num1 / _num2;
    }
    return theRatio;
  }

// ================= animation.js

  let sectionCount = 2;
  let shiftWidth = "-=" + 100 / sectionCount + "%";

  const controller = new ScrollMagic.Controller();
  const horizontalSlide = gsap
    // ======= scene 00
    .timeline()
    .addLabel("scene_00")
    .to("#sections-container", 0.5, {z: -150, rotation: 0.01})
    .to("#sections-container", { x: shiftWidth,} )
    .to("#sections-container", 0.5, {z: 0, rotation: 0.01})
  // ======= scene 10
  //.addLabel("scene_10")
  //.to("#sections-container", { x: shiftWidth})
  // ======= scene 20
  //.addLabel("scene_20")
  // .to("#sections-container", 1, { x: shiftWidth })
// ----------- create scene to pin and link animation
  const sideScroll = new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "200%"
  })
    .setPin("#pinContainer")
    .setTween(horizontalSlide)
    .addTo(controller);

// ================= nav.js
//   let navList = [
//     { text: "Home", link: "#sec_00", label: "scene_00"},
//     { text: "Section 1", link: "#sec_10", label: "scene_10"},
//     { text: "Section 2", link: "#sec_20", label: "scene_20"},
//     { text: "Section 3", link: "#sec_30", label: "scene_30"},
//   ];

  const onNavClick = function(event) {
    event.preventDefault();
    let $clickedAnchor = event.currentTarget;
    scrollWindow($clickedAnchor, $clickedAnchor.dataset.label, 1.5);
  };
// build the nav
  /*const buildNav = function() {
    const $body = document.querySelector("body");
    const $nav = document.createElement("nav");
    const $navUL = document.createElement("ul");
    $nav.prepend($navUL);
    $body.prepend($nav);

    navList.forEach(function(value, index) {
      let $li = document.createElement("li");
      let $a = document.createElement("a");
      $a.setAttribute("href", value.link);
      $a.setAttribute("data-label", value.label);
      $a.setAttribute("data-timeline", "horizontalSlide");
      $a.setAttribute("data-scene", "sideScroll");
      $a.innerText = value.text;
      $a.addEventListener("click", onNavClick);
      $li.append($a);
      $navUL.append($li);
    });
  };*/
//buildNav();
  let anchors  = document.querySelectorAll(".menu__link");

  anchors.forEach((function (link) {
    link.addEventListener('click', onNavClick);
  }));

  function resetNavHit(_currentNavAnchor) {
    anchors.forEach((function(value) {
      value.classList.remove("menu__link--active");
    }));
    _currentNavAnchor.classList.add("menu__link--active");
  }

  let sections = document.querySelectorAll(".slider__item");
  const setSelectedSection = function() {
    sections.forEach((function(value, index) {
      if (inFocus(value)) {
        resetNavHit(anchors[index]);
      }
    }));
  };

  document.addEventListener("scroll", (function() {
    setSelectedSection();
  }));
  setSelectedSection();



}());


(function(){

  var toggler = document.getElementById('main-nav-toggler');
  if(toggler){
    toggler.addEventListener('click', mainNavVisibleToggle);

    function mainNavVisibleToggle(e) {
      e.preventDefault();
      toggler.classList.toggle('burger--close'); // модификатор иконки (должен быть .burger)
      document.getElementById('main-nav').classList.toggle('main-nav--open');
    }
  }

  var linkClassName = 'main-nav__link';
  var linkClassNameShowChild = 'main-nav__item--show-child';
  var findLinkClassName = new RegExp(linkClassName);
  document.addEventListener('focus', (function(event) {
    if (findLinkClassName.test(event.target.className)) {
      event.target.parents('.main-nav__item').forEach((function(item){
        item.classList.add(linkClassNameShowChild);
      }));
    }
  }), true);
  document.addEventListener('blur', (function(event) {
    if (findLinkClassName.test(event.target.className)) {
      document.querySelectorAll('.'+linkClassNameShowChild).forEach((function(item){
        item.classList.remove(linkClassNameShowChild);
      }));
    }
  }), true);


  Element.prototype.parents = function(selector) {
    var elements = [];
    var elem = this;
    var ishaveselector = selector !== undefined;

    while ((elem = elem.parentElement) !== null) {
      if (elem.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (!ishaveselector || elem.matches(selector)) {
        elements.push(elem);
      }
    }

    return elements;
  };


}());

(function(){
  var modal = document.getElementById("video-modal");

  var btn = document.querySelector('.top__video');

  var close = modal.querySelector('.close');

  const stopVideo = function (element) {
    const iframe = element.querySelector('iframe');
    const video = element.querySelector('video');

    if (iframe) {
      //remove autoplay
      iframe.setAttribute('allow', '');
      iframe.src = iframe.src.replace('&autoplay=1', '');
    }
    if (video) {
      video.pause();
    }
  };

btn.addEventListener('click', (function(e){
  e.preventDefault();
  modal.classList.add('modal__show');
}));

close.addEventListener('click', (function(e){
  e.preventDefault();
  modal.classList.remove('modal__show');
  stopVideo(modal);
}));

window.addEventListener('click', (function (e) {
  if (e.target === modal) {
    modal.classList.remove('modal__show');
    stopVideo(modal);
  }
}));


}());
function findVideos() {
	let videos = document.querySelectorAll('.video');

	for (let i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	let link = video.querySelector('.video__link');
	let media = video.querySelector('.video__media');
	let button = video.querySelector('.video__button');
	let id = parseMediaURL(media);

	video.addEventListener('click', () => {
		let iframe = createIframe(id);

		link.remove();
		button.remove();
		video.appendChild(iframe);
	});

	link.removeAttribute('href');
	video.classList.add('video--enabled');
}

function parseMediaURL(media) {
	let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
	let url = media.src;
	let match = url.match(regexp);

	return match[1];
}

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURL(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();