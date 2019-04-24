$(document).ready(function() {

    // Hide the directory navigation
    // $('.division-directory').hide();


    // Show/Hide the directory navigation on-click
    $('.directory-toggle').click(function() {
        $(this).toggleClass("active");
        $('.division-directory').toggleClass("active");

        var state = $(this).attr('aria-expanded') == 'false' ? true : false;
        $(this).attr('aria-expanded', state);

        var stateHidden = $('#collapsible-0').attr('aria-hidden') == 'false' ? true : false;
        $('#collapsible-0').attr('aria-hidden', stateHidden);


        return false;
    });


    // For small screens - show/hide the search on-click
    $('.search-toggle').click(function() {
        $(this).toggleClass('active');
        $('.division-search').slideToggle();

        var state = $(this).attr('aria-expanded') == 'false' ? true : false;
        $(this).attr('aria-expanded', state);

        var stateHidden = $('#collapsible-1').attr('aria-hidden') == 'false' ? true : false;
        $('#collapsible-1').attr('aria-hidden', stateHidden);
        
        return false;
    });


});
/*
 * jQuery FlexSlider v2.7.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public

    //if rtl value was not passed and html is in rtl..enable it by default.
    if(typeof options.rtl=='undefined' && $('html').attr('dir')=='rtl'){
      options.rtl=true;
    }
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // deprecating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : ( slider.vars.rtl ? "marginRight" : "marginLeft" );
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (slider.vars.rtl?
                                ((keycode === 37) ? slider.getTarget('next') :
                                (keycode === 39) ? slider.getTarget('prev') : false)
                                :
                                ((keycode === 39) ? slider.getTarget('next') :
                                (keycode === 37) ? slider.getTarget('prev') : false)
                                )
                                ;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromX;
                if(slider.vars.rtl){
                  posFromX = -1*($slide.offset().right - $(slider).scrollLeft()); // Find position of slide relative to right of slider container
                }
                else
                {
                  posFromX = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                }
                if( posFromX <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;
                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : (slider.vars.rtl?-1:1)*(startX - localX);
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = (slider.vars.rtl?-1:1)*accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * ((slider.vars.rtl)?1:-1)) + "px";
          }());

      if (slider.transitions) {
        if (slider.isFirefox) {
          target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + (parseInt(target)+'px') + ",0,0)";
        } else {
          target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl?-1:1)*parseInt(target)+'px') + ",0,0)";
        }
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
          if(slider.vars.rtl){
            if (slider.isFirefox) {
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "right", "display": "block"});
            } else {
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            }

           }
            else{
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            }
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        if(slider.vars.rtl){
          slider.slides.css({"width": "100%", "float": 'right', "marginLeft": "-100%", "position": "relative"});
        }
        else{
          slider.slides.css({"width": "100%", "float": 'left', "marginRight": "-100%", "position": "relative"});
        }
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      if (slider.isFirefox) { slider.w = slider.width(); }
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,       //{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Browser Specific
    isFirefox: false,             // {NEW} Boolean: Set to true when Firefox is the browser used.

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {},             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  rtl: false             //{NEW} Boolean: Whether or not to enable RTL mode
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);

/**
 * @plugin
 * @name Core
 * @description Formstone Library core. Required for all plugins.
 */

var Formstone = this.Formstone = (function ($, window, document, undefined) {

	/* global ga */

	"use strict";

	// Namespace

	var Core = function() {
			this.Version = '@version';
			this.Plugins = {};

			this.DontConflict   = false;
			this.Conflicts      = {
				fn: {}
			};
			this.ResizeHandlers = [];

			// Globals

			this.window               = window;
			this.$window              = $(window);
			this.document             = document;
			this.$document            = $(document);
			this.$body                = null;

			this.windowWidth          = 0;
			this.windowHeight         = 0;
			this.userAgent            = window.navigator.userAgent || window.navigator.vendor || window.opera;
			this.isFirefox            = /Firefox/i.test(this.userAgent);
			this.isChrome             = /Chrome/i.test(this.userAgent);
			this.isSafari             = /Safari/i.test(this.userAgent) && !this.isChrome;
			this.isMobile             = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( this.userAgent );
			this.isFirefoxMobile      = (this.isFirefox && this.isMobile);
			this.transform            = null;
			this.transition           = null;

			this.support = {
				file          : !!(window.File && window.FileList && window.FileReader),
				history       : !!(window.history && window.history.pushState && window.history.replaceState),
				matchMedia    : !!(window.matchMedia || window.msMatchMedia),
				raf           : !!(window.requestAnimationFrame && window.cancelAnimationFrame),
				touch         : !!(("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
				transition    : false,
				transform     : false
			};
		},

		Functions = {

			/**
			 * @method private
			 * @name killEvent
			 * @description Stops event action and bubble.
			 * @param e [object] "Event data"
			 */

			killEvent: function(e, immediate) {
				try {
					e.preventDefault();
					e.stopPropagation();

					if (immediate) {
						e.stopImmediatePropagation();
					}
				} catch(error) {
					//
				}
			},

			/**
			 * @method private
			 * @name startTimer
			 * @description Starts an internal timer.
			 * @param timer [int] "Timer ID"
			 * @param time [int] "Time until execution"
			 * @param callback [function] "Function to execute"
			 * @return [int] "Timer ID"
			 */

			startTimer: function(timer, time, callback, interval) {
				Functions.clearTimer(timer);

				return (interval) ? setInterval(callback, time) : setTimeout(callback, time);
			},

			/**
			 * @method private
			 * @name clearTimer
			 * @description Clears an internal timer.
			 * @param timer [int] "Timer ID"
			 */

			clearTimer: function(timer, interval) {
				if (timer) {
					if (interval) {
						clearInterval(timer);
					} else {
						clearTimeout(timer);
					}

					timer = null;
				}
			},

			/**
			 * @method private
			 * @name sortAsc
			 * @description Sorts an array (ascending).
			 * @param a [mixed] "First value"
			 * @param b [mixed] "Second value"
			 * @return Difference between second and first values
			 */

			sortAsc: function(a, b) {
				return (parseInt(b) - parseInt(a));
			},

			/**
			 * @method private
			 * @name sortDesc
			 * @description Sorts an array (descending).
			 * @param a [mixed] "First value"
			 * @param b [mixed] "Second value"
			 * @return Difference between second and first values
			 */

			sortDesc: function(a, b) {
				return (parseInt(b) - parseInt(a));
			}
		},

		Formstone = new Core(),

		// Deferred ready

		$Ready = $.Deferred(),

		// Classes

		Classes = {
			base                 : "{ns}",
			element              : "{ns}-element"
		},

		// Events

		Events = {
			namespace            : ".{ns}",
			blur                 : "blur.{ns}",
			change               : "change.{ns}",
			click                : "click.{ns}",
			dblClick             : "dblclick.{ns}",
			drag                 : "drag.{ns}",
			dragEnd              : "dragend.{ns}",
			dragEnter            : "dragenter.{ns}",
			dragLeave            : "dragleave.{ns}",
			dragOver             : "dragover.{ns}",
			dragStart            : "dragstart.{ns}",
			drop                 : "drop.{ns}",
			error                : "error.{ns}",
			focus                : "focus.{ns}",
			focusIn              : "focusin.{ns}",
			focusOut             : "focusout.{ns}",
			input                : "input.{ns}",
			keyDown              : "keydown.{ns}",
			keyPress             : "keypress.{ns}",
			keyUp                : "keyup.{ns}",
			load                 : "load.{ns}",
			mouseDown            : "mousedown.{ns}",
			mouseEnter           : "mouseenter.{ns}",
			mouseLeave           : "mouseleave.{ns}",
			mouseMove            : "mousemove.{ns}",
			mouseOut             : "mouseout.{ns}",
			mouseOver            : "mouseover.{ns}",
			mouseUp              : "mouseup.{ns}",
			resize               : "resize.{ns}",
			scroll               : "scroll.{ns}",
			select               : "select.{ns}",
			touchCancel          : "touchcancel.{ns}",
			touchEnd             : "touchend.{ns}",
			touchLeave           : "touchleave.{ns}",
			touchMove            : "touchmove.{ns}",
			touchStart           : "touchstart.{ns}"
		};

	/**
	 * @method
	 * @name NoConflict
	 * @description Resolves plugin namespace conflicts
	 * @example Formstone.NoConflict();
	 */

	Core.prototype.NoConflict = function() {
		Formstone.DontConflict = true;

		for (var i in Formstone.Plugins) {
			if (Formstone.Plugins.hasOwnProperty(i)) {
				$[i]    = Formstone.Conflicts[i];
				$.fn[i] = Formstone.Conflicts.fn[i];
			}
		}
	};

	/**
	 * @method
	 * @name Plugin
	 * @description Builds a plugin and registers it with jQuery.
	 * @param namespace [string] "Plugin namespace"
	 * @param settings [object] "Plugin settings"
	 * @return [object] "Plugin properties. Includes `defaults`, `classes`, `events`, `functions`, `methods` and `utilities` keys"
	 * @example Formstone.Plugin("namespace", { ... });
	 */

	Core.prototype.Plugin = function(namespace, settings) {
		Formstone.Plugins[namespace] = (function(namespace, settings) {

			var namespaceDash  = "fs-" + namespace,
				namespaceDot   = "fs." + namespace,
				namespaceClean = "fs" + namespace.replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase(); });

			/**
			 * @method private
			 * @name initialize
			 * @description Creates plugin instance by adding base classname, creating data and scoping a _construct call.
			 * @param options [object] <{}> "Instance options"
			 */

			function initialize(options) {
				// Extend Defaults

				var hasOptions = $.type(options) === "object";

				options = $.extend(true, {}, settings.defaults || {}, (hasOptions ? options : {}));

				// Maintain Chain

				var $targets = this;

				for (var i = 0, count = $targets.length; i < count; i++) {
					var $element = $targets.eq(i);

					// Gaurd Against Exiting Instances

					if (!getData($element)) {

						// Extend w/ Local Options

						var guid    = "__" + settings.guid++,
							rawGuid = settings.classes.raw.base + guid,
							locals  = $element.data(namespace + "-options"),
							data    = $.extend(true, {
								$el     : $element,
								guid    : guid,
								rawGuid : rawGuid,
								dotGuid : "." + rawGuid
							}, options, ($.type(locals) === "object" ? locals : {}) );

						// Cache Instance

						$element.addClass(settings.classes.raw.element)
						        .data(namespaceClean, data);

						// Constructor

						settings.methods._construct.apply($element, [ data ].concat(Array.prototype.slice.call(arguments, (hasOptions ? 1 : 0) )));
					}

				}

				return $targets;
			}

			/**
			 * @method private
			 * @name destroy
			 * @description Removes plugin instance by scoping a _destruct call, and removing the base classname and data.
			 * @param data [object] <{}> "Instance data"
			 */

			/**
			 * @method widget
			 * @name destroy
			 * @description Removes plugin instance.
			 * @example $(".target").{ns}("destroy");
			 */

			function destroy(data) {
				settings.functions.iterate.apply(this, [ settings.methods._destruct ].concat(Array.prototype.slice.call(arguments, 1)));

				this.removeClass(settings.classes.raw.element)
					.removeData(namespaceClean);
			}

			/**
			 * @method private
			 * @name getData
			 * @description Creates class selector from text.
			 * @param $element [jQuery] "Target jQuery object"
			 * @return [object] "Instance data"
			 */

			function getData($element) {
				return $element.data(namespaceClean);
			}

			/**
			 * @method private
			 * @name delegateWidget
			 * @description Delegates public methods.
			 * @param method [string] "Method to execute"
			 * @return [jQuery] "jQuery object"
			 */

			function delegateWidget(method) {

				// If jQuery object

				if (this instanceof $) {

					var _method = settings.methods[method];

					// Public method OR false

					if ($.type(method) === "object" || !method) {

						// Initialize

						return initialize.apply(this, arguments);
					} else if (_method && method.indexOf("_") !== 0) {

						// Wrap Public Methods

						return settings.functions.iterate.apply(this, [ _method ].concat(Array.prototype.slice.call(arguments, 1)));
					}

					return this;
				}
			}

			/**
			 * @method private
			 * @name delegateUtility
			 * @description Delegates utility methods.
			 * @param method [string] "Method to execute"
			 */

			function delegateUtility(method) {

				// public utility OR utility init OR false

				var _method = settings.utilities[method] || settings.utilities._initialize || false;

				if (_method) {

					// Wrap Utility Methods

					return _method.apply(window, Array.prototype.slice.call(arguments, ($.type(method) === "object" ? 0 : 1) ));
				}
			}

			/**
			 * @method utility
			 * @name defaults
			 * @description Extends plugin default settings; effects instances created hereafter.
			 * @param options [object] <{}> "New plugin defaults"
			 * @example $.{ns}("defaults", { ... });
			 */

			function defaults(options) {
				settings.defaults = $.extend(true, settings.defaults, options || {});
			}

			/**
			 * @method private
			 * @name iterate
			 * @description Loops scoped function calls over jQuery object with instance data as first parameter.
			 * @param func [function] "Function to execute"
			 * @return [jQuery] "jQuery object"
			 */

			function iterate(fn) {
				var $targets = this;

				for (var i = 0, count = $targets.length; i < count; i++) {
					var $element = $targets.eq(i),
						data = getData($element) || {};

					if ($.type(data.$el) !== "undefined") {
						fn.apply($element, [ data ].concat(Array.prototype.slice.call(arguments, 1)));
					}
				}

				return $targets;
			}

			// Locals

			settings.initialized = false;
			settings.priority    = settings.priority || 10;

			// Namespace Classes & Events

			settings.classes   = namespaceProperties("classes", namespaceDash, Classes, settings.classes);
			settings.events    = namespaceProperties("events",  namespace,     Events,  settings.events);

			// Extend Functions

			settings.functions = $.extend({
				getData    : getData,
				iterate    : iterate
			}, Functions, settings.functions);

			// Extend Methods

			settings.methods = $.extend(true, {

				// Private Methods

				_setup         : $.noop,    // Document ready
				_construct     : $.noop,    // Constructor
				_destruct      : $.noop,    // Destructor
				_resize        : false,    // Window resize

				// Public Methods

				destroy        : destroy

			}, settings.methods);

			// Extend Utilities

			settings.utilities = $.extend(true, {

				// Private Utilities

				_initialize    : false,    // First Run
				_delegate      : false,    // Custom Delegation

				// Public Utilities

				defaults       : defaults

			}, settings.utilities);

			// Register Plugin

			// Widget

			if (settings.widget) {

				// Store conflicting namesapaces
				Formstone.Conflicts.fn[namespace] = $.fn[namespace];

				// Widget Delegation: $(".target").fsPlugin("method", ...);
				$.fn[namespaceClean] = delegateWidget;

				if (!Formstone.DontConflict) {

					// $(".target").plugin("method", ...);
					$.fn[namespace] = $.fn[namespaceClean];
				}
			}

			// Utility

				Formstone.Conflicts[namespace] = $[namespace];

				// Utility Delegation: $.fsPlugin("method", ... );
				$[namespaceClean] = settings.utilities._delegate || delegateUtility;

				if (!Formstone.DontConflict) {

					// $.plugin("method", ... );
					$[namespace] = $[namespaceClean];
				}

			// Run Setup

			settings.namespace      = namespace;
			settings.namespaceClean = namespaceClean;

			settings.guid = 0;

			// Resize handler

			if (settings.methods._resize) {
				Formstone.ResizeHandlers.push({
					namespace: namespace,
					priority: settings.priority,
					callback: settings.methods._resize
				});

				// Sort handlers on push
				Formstone.ResizeHandlers.sort(sortPriority);
			}

			return settings;
		})(namespace, settings);

		// Setup, catches lazy-loaded components, ensures order

		$Ready.then(function() {
			setupPlugin(namespace);
		});

		return Formstone.Plugins[namespace];
	};

	// Setup Plugins

	function setupPlugin(namespace) {
		if (!Formstone.Plugins[namespace].initialized) {
			Formstone.Plugins[namespace].methods._setup.call(document);
			Formstone.Plugins[namespace].initialized = true;
		}
	}

	// Namespace Properties

	function namespaceProperties(type, namespace, globalProps, customProps) {
		var _props = {
				raw: {}
			},
			i;

		customProps = customProps || {};

		for (i in customProps) {
			if (customProps.hasOwnProperty(i)) {
				if (type === "classes") {

					// Custom classes
					_props.raw[ customProps[i] ] = namespace + "-" + customProps[i];
					_props[ customProps[i] ]     = "." + namespace + "-" + customProps[i];
				} else {
					// Custom events
					_props.raw[ i ] = customProps[i];
					_props[ i ]     = customProps[i] + "." + namespace;
				}
			}
		}

		for (i in globalProps) {
			if (globalProps.hasOwnProperty(i)) {
				if (type === "classes") {

					// Global classes
					_props.raw[ i ] = globalProps[i].replace(/{ns}/g, namespace);
					_props[ i ]     = globalProps[i].replace(/{ns}/g, "." + namespace);
				} else {
					// Global events
					_props.raw[ i ] = globalProps[i].replace(/.{ns}/g, "");
					_props[ i ]     = globalProps[i].replace(/{ns}/g, namespace);
				}
			}
		}

		return _props;
	}

	// Set Transition Information

	function setTransitionInformation() {
		var transitionEvents = {
				"transition"          : "transitionend",
				"MozTransition"       : "transitionend",
				"OTransition"         : "otransitionend",
				"WebkitTransition"    : "webkitTransitionEnd"
			},
			transitionProperties = [
				"transition",
				"-webkit-transition"
			],
			transformProperties = {
				'transform'          : 'transform',
				'MozTransform'       : '-moz-transform',
				'OTransform'         : '-o-transform',
				'msTransform'        : '-ms-transform',
				'webkitTransform'    : '-webkit-transform'
			},
			transitionEvent       = "transitionend",
			transitionProperty    = "",
			transformProperty     = "",
			test                  = document.createElement("div"),
			i;


		for (i in transitionEvents) {
			if (transitionEvents.hasOwnProperty(i) && i in test.style) {
				transitionEvent = transitionEvents[i];
				Formstone.support.transition = true;
				break;
			}
		}

		Events.transitionEnd = transitionEvent + ".{ns}";

		for (i in transitionProperties) {
			if (transitionProperties.hasOwnProperty(i) && transitionProperties[i] in test.style) {
				transitionProperty = transitionProperties[i];
				break;
			}
		}

		Formstone.transition = transitionProperty;

		for (i in transformProperties) {
			if (transformProperties.hasOwnProperty(i) && transformProperties[i] in test.style) {
				Formstone.support.transform = true;
				transformProperty = transformProperties[i];
				break;
			}
		}

		Formstone.transform = transformProperty;
	}

	// Window resize

	var ResizeTimer = null,
		Debounce = 20;

	function onWindowResize() {
		Formstone.windowWidth  = Formstone.$window.width();
		Formstone.windowHeight = Formstone.$window.height();

		ResizeTimer = Functions.startTimer(ResizeTimer, Debounce, handleWindowResize);
	}

	function handleWindowResize() {
		for (var i in Formstone.ResizeHandlers) {
			if (Formstone.ResizeHandlers.hasOwnProperty(i)) {
				Formstone.ResizeHandlers[i].callback.call(window, Formstone.windowWidth, Formstone.windowHeight);
			}
		}
	}

	Formstone.$window.on("resize.fs", onWindowResize);
	onWindowResize();

	// Sort Priority

	function sortPriority(a, b) {
		return (parseInt(a.priority) - parseInt(b.priority));
	}

	// Document Ready

	$(function() {
		Formstone.$body = $("body");

		$Ready.resolve();
	});

	// Custom Events

	Events.clickTouchStart = Events.click + " " + Events.touchStart;

	// Transitions

	setTransitionInformation();

	return Formstone;

})(jQuery, this, document);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance Data"
	 * @param callback [object] "Function to call"
	 */

	function construct(data, callback) {
		if (callback) {
			// Target child element, for event delegation

			data.$target     = this.find(data.target);
			data.$check      = data.target ? data.$target : this;
			data.callback    = callback;
			data.styles      = getStyles(data.$check);
			data.timer       = null;

			var duration = data.$check.css( Formstone.transition + "-duration" ),
				durationValue = parseFloat(duration);

			if (Formstone.support.transition && duration && durationValue) {
				// If transitions supported and active

				this.on(Events.transitionEnd, data, onTranistionEnd);
			} else {
				data.timer = Functions.startTimer(data.timer, 50, function() {
					checkStyles(data);
				}, true);
			}
		}
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		Functions.clearTimer(data.timer, true);

		this.off(Events.namespace);
	}

	/**
	 * @method private
	 * @name onTransitionEnd
	 * @description Handles transition end events.
	 * @param e [object] "Event data"
	 */

	function onTranistionEnd(e) {
		e.stopPropagation();
		e.preventDefault();

		var data           = e.data,
			oe             = e.originalEvent,
			$target        = data.target ? data.$target : data.$el;

		// Check property and target
		if ( (!data.property || oe.propertyName === data.property) && $(oe.target).is($target) ) {
			resolve(data);
		}
	}

	/**
	 * @method private
	 * @name resolve
	 * @description Resolves transition end events.
	 * @param e [object] "Event data"
	 */
	/**
	 * @method
	 * @name resolve
	 * @description Resolves current transition end events.
	 * @example $(".target").transition("resolve");
	 */

	function resolve(data) {
		if (!data.always) {
			// Unbind events, clear timers, similiar to .one()

			data.$el[Plugin.namespaceClean]("destroy"); // clean up old data?
		}

		// fire callback

		data.callback.apply(data.$el);
	}

	/**
	 * @method private
	 * @name checkStyles
	 * @description Compares current CSS to previous styles.
	 * @param data [object] "Instance data"
	 */

	function checkStyles(data) {
		var styles = getStyles(data.$check);

		if (!isEqual(data.styles, styles)) {
			resolve(data);
		}

		data.styles = styles;
	}

	/**
	 * @method private
	 * @name getStyles
	 * @description Returns element's styles.
	 * @param el [DOM] "Element to check"
	 */

	function getStyles(el) {
		var computed,
			styles = {},
			prop,
			val;

		if (el instanceof $) {
			el = el[0];
		}

		if (Window.getComputedStyle) {
			// FireFox, Chrome, Safari

			computed = Window.getComputedStyle(el, null);

			for (var i = 0, count = computed.length; i < count; i++) {
				prop = computed[i];
				val = computed.getPropertyValue(prop);

				styles[prop] = val;
			}
		} else if (el.currentStyle) {
			// IE, Opera

			computed = el.currentStyle;

			for (prop in computed) {
				if (computed[prop]) { // ie8...
					styles[prop] = computed[prop];
				}
			}
		}

		return styles;
	}

	/**
	 * @method private
	 * @name isEqual
	 * @description Compares two obejcts.
	 * @param a [object] "Object to compare"
	 * @param b [object] "Object to compare"
	 */

	function isEqual(a, b) {
		if ($.type(a) !== $.type(b)) {
			return false;
		}

		for (var i in a) {
			if ( !(a.hasOwnProperty(i) && b.hasOwnProperty(i) && a[i] === b[i]) ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @plugin
	 * @name Transition
	 * @description A jQuery plugin for CSS transition events.
	 * @type widget
	 * @dependency core.js
	 */

	var Plugin = Formstone.Plugin("transition", {
			widget: true,

			/**
			 * @options
			 * @param always [boolean] <False> "Flag to always react to transition end (.on vs .one)"
			 * @param property [string] <null> "Property to react to"
			 * @param target [string] <null> "Target child selector"
			 */

			defaults: {
				always      : false,
				property    : null,
				target      : null
			},

			methods : {
				_construct    : construct,
				_destruct     : destruct,
				resolve       : resolve
			}
		}),

		// Localize References

		Events       = Plugin.events,
		Functions    = Plugin.functions,

		Window       = Formstone.window;

})(jQuery, Formstone);
/* 
 * Shifter v3.1.2 - 2014-10-28 
 * A jQuery plugin for simple slide-out mobile navigation. Part of the Formstone Library. 
 * http://formstone.it/shifter/ 
 * 
 * Copyright 2014 Ben Plum; MIT Licensed 
 */

;(function ($, window) {
	"use strict";

	var namespace = "shifter",
		initialized = false,
		hasTouched = false,
		data = {},
		classes = {
			handle: "shifter-handle",
			page: "shifter-page",
			header: "shifter-header",
			navigation: "shifter-navigation",
			isEnabled: "shifter-enabled",
			isOpen: "shifter-open"
		},
		events = {
			click: "touchstart." + namespace + " click." + namespace
		};

	/**
	 * @options
	 * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
	 */
	var options = {
		maxWidth: "980px"
	};

	var pub = {

		/**
		 * @method
		 * @name close
		 * @description Closes navigation if open
		 * @example $.shifter("close");
		 */
		close: function() {
			if (initialized) {
				data.$html.removeClass(classes.isOpen);
				data.$body.removeClass(classes.isOpen);
				data.$shifts.off( classify(namespace) );
				// Close mobile keyboard if open
				data.$nav.find("input").trigger("blur");
			}
		},

		/**
		 * @method
		 * @name enable
		 * @description Enables navigation system
		 * @example $.shifter("enable");
		 */
		enable: function() {
			if (initialized) {
				data.$body.addClass(classes.isEnabled);
			}
		},

		/**
		 * @method
		 * @name destroy
		 * @description Removes instance of plugin
		 * @example $.shifter("destroy");
		 */
		destroy: function() {
			if (initialized) {
				data.$html.removeClass(classes.isOpen);
				data.$body.removeClass( [classes.isEnabled, classes.isOpen].join(" ") )
					      .off(events.click);

				// Navtive MQ Support
				if (window.matchMedia !== undefined) {
					data.mediaQuery.removeListener(onRespond);
				}

				data = {};
				initialized = false;
			}
		},

		/**
		 * @method
		 * @name disable
		 * @description Disables navigation system
		 * @example $.shifter("disable");
		 */
		disable: function() {
			if (initialized) {
				pub.close();
				data.$body.removeClass(classes.isEnabled);
			}
		},

		/**
		 * @method
		 * @name open
		 * @description Opens navigation if closed
		 * @example $.shifter("open");
		 */
		open: function() {
			if (initialized) {
				data.$html.addClass(classes.isOpen);
				data.$body.addClass(classes.isOpen);
				data.$shifts.one(events.click, onClick);
			}
		}
	};

	/**
	 * @method private
	 * @name init
	 * @description Initializes plugin
	 * @param opts [object] "Initialization options"
	 */
	function init(opts) {
		if (!initialized) {
			data = $.extend({}, options, opts || {});

			data.$html = $("html");
			data.$body = $("body");
			data.$shifts = $( [classify(classes.page), classify(classes.header)].join(", ") );
			data.$nav = $( classify(classes.navigation) );

			if (data.$shifts.length > 0 && data.$nav.length > 0) {
				initialized = true;

				data.$body.on(events.click, classify(classes.handle), onClick);

				// Navtive MQ Support
				if (window.matchMedia !== undefined) {
					data.mediaQuery = window.matchMedia("(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")");
					data.mediaQuery.addListener(onRespond);
					onRespond();
				}
			}
		}
	}

	/**
	 * @method private
	 * @name onRespond
	 * @description Handles media query match change
	 */
	function onRespond() {
		if (data.mediaQuery.matches) {
			pub.enable();
		} else {
			pub.disable();
		}
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Determines proper click / touch action
	 * @param e [object] "Event data"
	 */
	function onClick(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!hasTouched) {
			if (data.$body.hasClass(classes.isOpen)) {
				pub.close();
			} else {
				pub.open();
			}
		}

		if (e.type === "touchstart") {
			hasTouched = true;

			setTimeout(resetTouch, 500);
		}
	}

	/**
	 * @method private
	 * @name resetTouch
	 * @description Resets touch state
	 */
	function resetTouch() {
		hasTouched = false;
	}

	/**
	 * @method private
	 * @name classify
	 * @description Create class selector from text
	 * @param text [string] "Text to convert"
	 * @return [string] "New class name"
	 */
	function classify(text) {
		return "." + text;
	}

	$[namespace] = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return init.apply(this, arguments);
		}
		return this;
	};
})(jQuery, window);
// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
(function(window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function(stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      //"slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl:
        '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl:
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar">' +
      "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
      "</div>" +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download:
        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" />' +
        "</svg>" +
        "</a>",

      zoom:
        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" />' +
        "</svg>" +
        "</button>",

      close:
        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,10 L30,30 M30,10 L10,30" />' +
        "</svg>" +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn:
        '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',

      // Arrows
      arrowLeft:
        '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path>' +
        "</svg>" +
        "</a>",

      arrowRight:
        '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>' +
        "</svg>" +
        "</a>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: false,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable dragging/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 4000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
		afterShow: function( instance, current ) {
			console.info( 'Clicked element:' );
			console.info( current.opts.$orig );
		}
	*/

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function(current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      idleTime: false,
      clickContent: function(current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function(current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schliessen",
        NEXT: "Weiter",
        PREV: "Zurück",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Maßstab"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function() {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function(opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function(key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function(content, opts, index) {
    var self = this;

    self.opts = mergeOpts({index: index}, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    // Save last active element
    self.$lastFocus = $(document.activeElement).trigger("blur");

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function() {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        scrollbarWidth = $.fancybox.scrollbarWidth,
        $scrollDiv,
        $container,
        buttonStr;

      // Hide scrollbars
      // ===============

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false) {
        $("body").addClass("fancybox-active");

        if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
          if (scrollbarWidth === undefined) {
            $scrollDiv = $('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body");

            scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;

            $scrollDiv.remove();
          }

          $("head").append(
            '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
              scrollbarWidth +
              "px; }</style>"
          );

          $("body").addClass("compensate-for-scrollbar");
        }
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function(index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
        self.translate(
          self,
          firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
        )
      )
        .attr("id", "fancybox-container-" + self.id)
        .addClass("fancybox-is-hidden")
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function(obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang];

      return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
        var value = arr[n];

        if (value === undefined) {
          return match;
        }

        return value;
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function(content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function(i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.videoFormat) {
              obj.opts.videoFormat = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image
        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.opts.$thumb = obj.opts.$trigger.find("img:first");
        }

        if ((!obj.opts.$thumb || !obj.opts.$thumb.length) && obj.opts.$orig) {
          obj.opts.$thumb = obj.opts.$orig.find("img:first");
        }

        // "caption" is a "special" option, it can be used to customize caption per gallery item ..
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detect idle
    // ======================================

    addEvents: function() {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function(e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      $W.on("orientationchange.fb resize.fb", function(e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          requestAFrame(function() {
            self.update();
          });
        } else {
          self.$refs.stage.hide();

          setTimeout(function() {
            self.$refs.stage.show();

            self.update();
          }, $.fancybox.isMobile ? 600 : 250);
        }
      });

      // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
      // (a.k.a. "escaping the modal")
      $D.on("focusin.fb", function(e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null;

        if (
          instance.isClosing ||
          !instance.current ||
          !instance.current.opts.trapFocus ||
          $(e.target).hasClass("fancybox-container") ||
          $(e.target).is(document)
        ) {
          return;
        }

        if (instance && $(e.target).css("position") !== "fixed" && !instance.$refs.container.has(e.target).length) {
          e.stopPropagation();

          instance.focus();
        }
      });

      // Enable keyboard navigation
      $D.on("keydown.fb", function(e) {
        var current = self.current,
          keycode = e.keyCode || e.which;

        if (!current || !current.opts.keyboard) {
          return;
        }

        if (e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input") || $(e.target).is("textarea")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function(e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function() {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function() {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("focusin.fb keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function(duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function(duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function(pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        loop,
        current,
        previous,
        canvasWidth,
        currentPos,
        transitionProps;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      pos = parseInt(pos, 10);

      // Should loop?
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      firstRun = self.firstRun = !Object.keys(self.slides).length;

      if (groupLen < 2 && !firstRun && !!self.isDragging) {
        return;
      }

      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      // Create slides
      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }

        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      currentPos = $.fancybox.getTranslate(current.$slide);

      current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass("fancybox-animated");

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.removeClass("fancybox-is-hidden");

        forceRedraw(self.$refs.container);

        self.$refs.container.addClass("fancybox-is-open");

        forceRedraw(self.$refs.container);

        // Make current slide visible
        current.$slide.addClass("fancybox-slide--previous");

        // Attempt to load content into slide;
        // at this point image would start loading, but inline/html content would load immediately
        self.loadSlide(current);

        current.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current");

        self.preload("image");

        return;
      }

      // Clean up
      $.each(self.slides, function(index, slide) {
        $.fancybox.stop(slide.$slide);
      });

      // Make current that slide is visible even if content is still loading
      current.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current");

      // If slides have been dragged, animate them to correct position
      if (current.isMoved) {
        canvasWidth = Math.round(current.$slide.width());

        $.each(self.slides, function(index, slide) {
          var pos = slide.pos - current.pos;

          $.fancybox.animate(
            slide.$slide,
            {
              top: 0,
              left: pos * canvasWidth + pos * slide.opts.gutter
            },
            duration,
            function() {
              slide.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                current.isMoved = false;

                self.complete();
              }
            }
          );
        });
      } else {
        self.$refs.stage.children().removeAttr("style");
      }

      // Start transition that reveals current content
      // or wait when it will be loaded

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");

      if (previous.pos === current.pos) {
        return;
      }

      // Handle previous slide
      // =====================

      transitionProps = "fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous");

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");

      previous.isComplete = false;

      if (!duration || (!current.isMoved && !current.opts.transitionEffect)) {
        return;
      }

      if (current.isMoved) {
        previous.$slide.addClass(transitionProps);
      } else {
        transitionProps = "fancybox-animated " + transitionProps + " fancybox-fx-" + current.opts.transitionEffect;

        $.fancybox.animate(previous.$slide, transitionProps, duration, function() {
          previous.$slide.removeClass(transitionProps).removeAttr("style");
        });
      }
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function(pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function(x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content,
        {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function(duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content,
        {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function(slide) {
      var self = this,
        $content = slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        margin,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      margin = {
        top: parseInt(slide.$slide.css("paddingTop"), 10),
        right: parseInt(slide.$slide.css("paddingRight"), 10),
        bottom: parseInt(slide.$slide.css("paddingBottom"), 10),
        left: parseInt(slide.$slide.css("paddingLeft"), 10)
      };

      // We can not use $slide width here, because it can have different diemensions while in transiton
      maxWidth = parseInt(self.$refs.stage.width(), 10) - (margin.left + margin.right);
      maxHeight = parseInt(self.$refs.stage.height(), 10) - (margin.top + margin.bottom);

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      // Use floor rounding to make sure it really fits
      width = Math.floor(minRatio * width);
      height = Math.floor(minRatio * height);

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + margin.top;
        rez.left = Math.floor((maxWidth - width) * 0.5) + margin.left;
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function() {
      var self = this;

      $.each(self.slides, function(key, slide) {
        self.updateSlide(slide);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function(slide, duration) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height;

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      slide.$slide.trigger("refresh");

      self.$refs.toolbar.toggleClass("compensate-for-scrollbar", slide.$slide.get(0).scrollHeight > slide.$slide.get(0).clientHeight);

      self.trigger("onUpdate", slide);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function(slide, duration) {
      var self = this,
        canvasWidth,
        pos;

      if (self.current) {
        canvasWidth = Math.round(slide.$slide.width());
        pos = slide.pos - self.current.pos;

        $.fancybox.animate(
          slide.$slide,
          {
            top: 0,
            left: pos * canvasWidth + pos * slide.opts.gutter,
            opacity: 1
          },
          duration === undefined ? 0 : duration,
          null,
          false
        );
      }
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function(nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"),
        isZoomable;

      if (!current || self.isClosing) {
        return;
      }

      isZoomable = self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      // Set cursor to zoom in/out if click event is 'zoom'
      if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom"))
      ) {
        if (self.isScaledDown(nextWidth, nextHeight)) {
          // If image is scaled down, then, obviously, it can be zoomed to full size
          $container.addClass("fancybox-can-zoomIn");
        } else {
          if (current.opts.touch) {
            // If image size ir largen than available available and touch module is not disable,
            // then user can do panning
            $container.addClass("fancybox-can-drag");
          } else {
            $container.addClass("fancybox-can-zoomOut");
          }
        }
      } else if (current.opts.touch && current.contentType !== "video") {
        $container.addClass("fancybox-can-drag");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function() {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (current.width > fitPos.width || current.height > fitPos.height) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function(nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function() {
      var self = this,
        rez = false,
        current = self.current,
        $content;

      if (current.type === "image" && ($content = current.$content) && !current.hasError) {
        rez = self.getFitPos(current);
        rez = Math.abs($content.width() - rez.width) > 1 || Math.abs($content.height() - rez.height) > 1;
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function(slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      self.trigger("beforeLoad", slide);

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            '<video class="fancybox-video" controls controlsList="nodownload">' +
              '<source src="' +
              slide.src +
              '" type="' +
              slide.opts.videoFormat +
              '">' +
              "Your browser doesn't support HTML5 video" +
              "</video"
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function(data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function(jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function() {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function(slide) {
      var self = this,
        srcset = slide.opts.srcset || slide.opts.image.srcset,
        thumbSrc,
        found,
        temp,
        pxRatio,
        windowWidth;

      // Check if need to show loading icon
      slide.timouts = setTimeout(function() {
        var $img = slide.$image;

        if (slide.isLoading && (!$img || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 350);

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function(el) {
          var ret = {};

          el
            .trim()
            .split(/\s+/)
            .forEach(function(el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function(a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      thumbSrc = slide.opts.thumb || (slide.opts.$thumb && slide.opts.$thumb.length ? slide.opts.$thumb.attr("src") : false);

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && thumbSrc) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        slide.$ghost = $("<img />")
          .one("error", function() {
            $(this).remove();

            slide.$ghost = null;
          })
          .one("load", function() {
            self.afterLoad(slide);
          })
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", thumbSrc);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Create full-size image
    // ======================

    setBigImage: function(slide) {
      var self = this,
        $img = $("<img />");

      slide.$image = $img
        .one("error", function() {
          self.setError(slide);
        })
        .one("load", function() {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          // Clear timeout that checks if loading icon needs to be displayed
          if (slide.timouts) {
            clearTimeout(slide.timouts);
            slide.timouts = null;
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function() {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
        $img.trigger("load");
      } else if ($img[0].error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function(slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function(e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function() {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate contnet dimensions if it is accessible
          if ($body && $body.length && $body.children().length) {
            $content.css({
              width: "",
              height: ""
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            if (frameWidth) {
              $content.width(frameWidth);
            }

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            if (frameHeight) {
              $content.height(frameHeight);
            }
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        this.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function() {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function(slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        content
          .parent()
          .parent(".fancybox-slide--inline")
          .trigger("onReset");

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();

          // If we have text node, then add wrapping element to make vertical alignment work
          if (content[0].nodeType === 3) {
            content = $("<div>").html(content);
          }
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function() {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio")
        .first()
        .addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      this.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function(slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide);
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function(slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).prependTo(slide.$content);
      }

      if (slide.opts.protect && slide.$content && !slide.hasError) {
        // Disable right click
        slide.$content.on("contextmenu.fb", function(e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.revealContent(slide);
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function(slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        effect,
        effectClassName,
        duration,
        opacity;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      // Do not animate if revealing the same slide
      if (slide.pos === self.currPos) {
        if (slide.isComplete) {
          effect = false;
        } else {
          self.isAnimating = true;
        }
      }

      if (slide.isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function() {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content
      // ===================

      if (!effect) {
        forceRedraw($slide);

        slide.$content.removeClass("fancybox-is-hidden");

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      $.fancybox.stop($slide);

      effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;

      $slide
        .removeAttr("style")
        .removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous")
        .addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow for CSS3 transitions
      forceRedraw($slide);

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function(e) {
          $slide.removeClass(effectClassName).removeAttr("style");

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function(slide) {
      var self = this,
        rez = false,
        $thumb = slide.opts.$thumb,
        thumbPos = $thumb && $thumb.length && $thumb[0].ownerDocument === document ? $thumb.offset() : 0,
        slidePos;

      // Check if element is inside the viewport by at least 1 pixel
      var isElementVisible = function($el) {
        var element = $el[0],
          elementRect = element.getBoundingClientRect(),
          parentRects = [],
          visibleInAllParents;

        while (element.parentElement !== null) {
          if ($(element.parentElement).css("overflow") === "hidden" || $(element.parentElement).css("overflow") === "auto") {
            parentRects.push(element.parentElement.getBoundingClientRect());
          }

          element = element.parentElement;
        }

        visibleInAllParents = parentRects.every(function(parentRect) {
          var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
          var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

          return visiblePixelX > 0 && visiblePixelY > 0;
        });

        return (
          visibleInAllParents &&
          elementRect.bottom > 0 &&
          elementRect.right > 0 &&
          elementRect.left < $(window).width() &&
          elementRect.top < $(window).height()
        );
      };

      if (thumbPos && isElementVisible($thumb)) {
        slidePos = self.$refs.stage.offset();

        rez = {
          top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
          left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
          width: $thumb.width(),
          height: $thumb.height(),
          scaleX: 1,
          scaleY: 1
        };
      }

      return rez;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function() {
      var self = this,
        current = self.current,
        slides = {};

      if (current.isMoved || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS3 transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function(key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Play first html5 video/audio
      current.$slide
        .find("video,audio")
        .filter(":visible:first")
        .trigger("play");

      // Try to focus on the first focusable element
      if (
        $(document.activeElement).is("[disabled]") ||
        (current.opts.autoFocus && !(current.type == "image" || current.type === "iframe"))
      ) {
        self.focus();
      }
    },

    // Preload next and previous slides
    // ================================

    preload: function(type) {
      var self = this,
        next = self.slides[self.currPos + 1],
        prev = self.slides[self.currPos - 1];

      if (next && next.type === type) {
        self.loadSlide(next);
      }

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function() {
      var current = this.current,
        $el;

      if (this.isClosing) {
        return;
      }

      if (current && current.isComplete && current.$content) {
        // Look for first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if (!$el.length) {
          $el = current.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
        }

        $el = $el && $el.length ? $el : current.$content;

        $el.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function() {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function() {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function(e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function() {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function() {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      if (current.timouts) {
        clearTimeout(current.timouts);
      }

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      // Remove other slides
      current.$slide
        .off(transitionEnd)
        .removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls();

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !(e !== true && $content && duration && current.type === "image" && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          $.fancybox.animate(
            current.$slide.removeClass("fancybox-slide--current"),
            "fancybox-animated fancybox-slide--previous fancybox-fx-" + effect,
            duration,
            done
          );
        }
      } else {
        done();
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function(e) {
      var self = this,
        $body = $("body"),
        instance,
        scrollTop;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (self.$lastFocus && !!self.current.opts.backFocus) {
        self.$lastFocus.trigger("focus");
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $body.removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function(name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function(force) {
      var self = this,
        current = self.current,
        index = current.index,
        caption = current.opts.caption,
        $container = self.$refs.container,
        $caption = self.$refs.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      self.$caption = caption && caption.length ? $caption.html(caption) : null;

      if (!self.isHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").toggleClass("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").toggleClass("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function() {
      this.isHiddenControls = true;

      this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
    },

    showControls: function() {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.isHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);

      if (self.$caption) {
        $container.addClass("fancybox-show-caption ");
      } else {
        $container.removeClass("fancybox-show-caption");
      }
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function() {
      if (this.isHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "3.3.5",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function(command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function(items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function(all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance

        if (all === true) {
          this.close();
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function() {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile:
      document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function() {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str = (str.length ? str + " " : "") + "scale(" + props.scaleX + ", " + props.scaleY + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function($el, to, duration, callback, leaveAnimationName) {
      var final = false;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      if (!$.isPlainObject(to)) {
        $el.removeAttr("style");
      }

      $.fancybox.stop($el);

      $el.on(transitionEnd, function(e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        $.fancybox.stop($el);

        if (final) {
          $.fancybox.setTranslate($el, final);
        }

        if ($.isPlainObject(to)) {
          if (leaveAnimationName === false) {
            $el.removeAttr("style");
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          final = $.extend({}, to, {
            width: $el.width() * to.scaleX,
            height: $el.height() * to.scaleY,
            scaleX: 1,
            scaleY: 1
          });

          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function() {
          $el.trigger("transitionend");
        }, duration + 16)
      );
    },

    stop: function($el) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        $el.off("transitionend").css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = e && e.data ? e.data.options : opts || {};

    $target = opts.$target || $(e.currentTarget);
    value = $target.attr("data-fancybox") || "";

    // Get all related items and find index for clicked one
    if (value) {
      items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
      items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');

      index = items.index($target);

      // Sometimes current item can not be found (for example, if some script clones items)
      if (index < 0) {
        index = 0;
      }
    } else {
      items = [$target];
    }

    $.fancybox.open(items, opts, index);
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function(options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {options: options}, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start",
        {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-trigger]", function(e) {
    _run(e, {
      $target: $('[data-fancybox="' + $(e.currentTarget).attr("data-trigger") + '"]').eq($(e.currentTarget).attr("data-index") || 0),
      $trigger: $(this)
    });
  });
})(window, document, window.jQuery || jQuery);

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($) {
  "use strict";

  // Formats matching url to final form

  var format = function(url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function(key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  // Object containing properties for each media type

  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },

    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1,
        api: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },

    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },

    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function(rez) {
        return (
          "//maps.google." +
          rez[2] +
          "/?ll=" +
          (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
          "&output=" +
          (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        );
      }
    },

    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function(rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };

  $(document).on("objectNeedsType.fb", function(e, instance, item) {
    var url = item.src || "",
      type = false,
      media,
      thumb,
      rez,
      params,
      urlParams,
      paramObj,
      provider;

    media = $.extend(true, {}, defaults, item.opts.media);

    // Look for any matching media type
    $.each(media, function(providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);

      url =
        $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

      thumb =
        $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    });

    // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });
})(window.jQuery || jQuery);

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window, document, $) {
  "use strict";

  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function() {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      }
    );
  })();

  var getPointerXY = function(e) {
    var result = [];

    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function(point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function($el) {
    if (
      $el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') ||
      $.isFunction($el.get(0).onclick) ||
      $el.data("selectable")
    ) {
      return true;
    }

    // Check for attributes like data-fancybox-next or data-fancybox-close
    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function(el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
      overflowX = window.getComputedStyle(el)["overflow-x"],
      vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
      horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;

    return vertical || horizontal;
  };

  var isScrollable = function($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function(instance) {
    var self = this;

    self.instance = instance;

    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;

    self.destroy();

    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function() {
    this.$container.off(".fb.touch");
  };

  Guestures.prototype.ontouchstart = function(e) {
    var self = this,
      $target = $(e.target),
      instance = self.instance,
      current = instance.current,
      $content = current.$content,
      isTouchDevice = e.type == "touchstart";

    // Do not respond to both (touch and mouse) events
    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    }

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Ignore taping on links, buttons, input elements
    if (!$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    }

    // Ignore clicks on the scrollbar
    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Ignore clicks while zooming or closing
    if (!current || instance.isAnimating || instance.isClosing) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    e.stopPropagation();

    self.startEvent = e;

    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;

    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;

    self.canvasWidth = Math.round(current.$slide[0].clientWidth);
    self.canvasHeight = Math.round(current.$slide[0].clientHeight);

    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {top: 0, left: 0};
    self.sliderStartPos = self.sliderLastPos || $.fancybox.getTranslate(current.$slide);

    // Since position will be absolute, but we need to make it relative to the stage
    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);

    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;

    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;

    $(document)
      .off(".fb.touch")
      .on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
      .on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      return;
    }

    if (!($.fancybox.isMobile && (isScrollable($target) || isScrollable($target.parent())))) {
      e.preventDefault();
    }

    if (self.startPoints.length === 1 || current.hasError) {
      if (self.instance.canPan()) {
        $.fancybox.stop(self.$content);

        self.$content.css("transition-duration", "");

        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-controls--isGrabbing");
    }

    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;

      self.isZooming = true;

      $.fancybox.stop(self.$content);

      self.$content.css("transition-duration", "");

      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function(e) {
    var self = this;

    self.isScrolling = true;

    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function(e) {
    var self = this,
      $target = $(e.target);

    // Make sure user has not released over iframe or disabled element
    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      self.canTap = false;

      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.instance.canPan()) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");

    self.distance = distance(self.newPoints[0], self.startPoints[0]);

    // Skip false ontouchmove events (Chrome)
    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function(e) {
    var self = this,
      swiping = self.isSwiping,
      left = self.sliderStartPos.left || 0,
      angle;

    // If direction is not yet determined
    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (self.instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (self.instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);

          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        self.canTap = false;

        if (self.isSwiping === "y" && $.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          self.isScrolling = true;

          return;
        }

        self.instance.isDragging = self.isSwiping;

        // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
        self.startPoints = self.newPoints;

        $.each(self.instance.slides, function(index, slide) {
          $.fancybox.stop(slide.$slide);

          slide.$slide.css("transition-duration", "");

          slide.inTransition = false;

          if (slide.pos === self.instance.current.pos) {
            self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left - $.fancybox.getTranslate(self.instance.$refs.stage).left;
          }
        });

        // Stop slideshow
        if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
          self.instance.SlideShow.stop();
        }
      }

      return;
    }

    // Sticky edges
    if (swiping == "x") {
      if (
        self.distanceX > 0 &&
        (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
      ) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (
        self.distanceX < 0 &&
        (self.instance.group.length < 2 ||
          (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
      ) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function(index, slide) {
          var pos = slide.pos - self.instance.currPos;

          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });

        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function() {
    var self = this;

    // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;

    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  // Make panning sticky to the edges
  Guestures.prototype.limitMovement = function() {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    var distanceX = self.distanceX;
    var distanceY = self.distanceY;

    var contentStartPos = self.contentStartPos;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY;

    // Slow down proportionally to traveled distance
    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);

    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);

    //   ->
    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    }

    //    <-
    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    }

    //   \/
    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    }

    //   /\
    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function() {
    var self = this;

    // Calculate current distance between points to get pinch ratio and new width and height
    var contentStartPos = self.contentStartPos;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio);

    // This is the translation due to pinch-zooming
    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

    // Point between the two touches
    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

    // And this is the translation due to translation of the centerpoint
    // between the two fingers
    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

    // The new offset is the old/current one plus the total translation
    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };

    self.canTap = false;

    self.newWidth = newWidth;
    self.newHeight = newHeight;

    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function(e) {
    var self = this;
    var dMs = Math.max(new Date().getTime() - self.startTime, 1);

    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;

    self.endPoints = getPointerXY(e);

    self.$container.removeClass("fancybox-controls--isGrabbing");

    $(document).off(".fb.touch");

    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 366;

    // Speed in px/ms
    self.velocityX = self.distanceX / dMs * 0.5;
    self.velocityY = self.distanceY / dMs * 0.5;

    self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function(swiping, scrolling) {
    var self = this,
      ret = false,
      len = self.instance.group.length;

    self.sliderLastPos = null;

    // Close if swiped vertically / navigate if horizontally
    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(
        self.instance.current.$slide,
        {
          top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
          opacity: 0
        },
        200
      );

      ret = self.instance.close(true, 200);
    } else if (swiping == "x" && self.distanceX > 50 && len > 1) {
      ret = self.instance.previous(self.speedX);
    } else if (swiping == "x" && self.distanceX < -50 && len > 1) {
      ret = self.instance.next(self.speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      if (scrolling || len < 2) {
        self.instance.centerSlide(self.instance.current, 150);
      } else {
        self.instance.jumpTo(self.instance.current.index);
      }
    }

    self.$container.removeClass("fancybox-is-sliding");
  };

  // Limit panning from edges
  // ========================
  Guestures.prototype.endPanning = function() {
    var self = this;
    var newOffsetX, newOffsetY, newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
      newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;

    $.fancybox.animate(self.$content, newPos, 330);
  };

  Guestures.prototype.endZooming = function() {
    var self = this;

    var current = self.instance.current;

    var newOffsetX, newOffsetY, newPos, reset;

    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;

    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    };

    // Reset scalex/scaleY values; this helps for perfomance and does not break animation
    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

      // Switch from scale() to width/height or animation will not work correctly
      $.fancybox.setTranslate(self.$content, $.fancybox.getTranslate(self.$content));

      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function(e) {
    var self = this;
    var $target = $(e.target);

    var instance = self.instance;
    var current = instance.current;

    var endPoints = (e && getPointerXY(e)) || self.startPoints;

    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;

    var where;

    var process = function(prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);

          break;

        case "toggleControls":
          instance.toggleControls(true);

          break;

        case "next":
          instance.next();

          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    };

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Skip if clicked on the scrollbar
    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Check where is clicked
    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (
      instance.current.$content &&
      instance.current.$content
        .find($target)
        .addBack()
        .filter($target).length
    ) {
      where = "Content";
    } else {
      return;
    }

    // Check if this is a double tap
    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null;

      // Skip if distance between taps is too big
      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      }

      // OK, now we assume that this is a double-tap
      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function() {
          self.tapped = null;

          process("click" + where);
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function(e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  });
})(window, document, window.jQuery || jQuery);

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow:
        '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,12 L27,20 L13,27 Z" />' +
        '<path d="M15,10 v19 M23,10 v19" />' +
        "</svg>" +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000
    }
  });

  var SlideShow = function(instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function() {
      var self = this;

      self.$button = self.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
        self.toggle();
      });

      if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
        self.$button.hide();
      }
    },

    set: function(force) {
      var self = this;

      // Check if reached last element
      if (
        self.instance &&
        self.instance.current &&
        (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)
      ) {
        self.timer = setTimeout(function() {
          if (self.isActive) {
            self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
          }
        }, self.instance.current.opts.slideShow.speed);
      } else {
        self.stop();
        self.instance.idleSecondsCounter = 0;
        self.instance.showControls();
      }
    },

    clear: function() {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;
    },

    start: function() {
      var self = this;
      var current = self.instance.current;

      if (current) {
        self.isActive = true;

        self.$button
          .attr("title", current.opts.i18n[current.opts.lang].PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.set(true);
      }
    },

    stop: function() {
      var self = this;
      var current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", current.opts.i18n[current.opts.lang].PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;
    },

    toggle: function() {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function(e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function(e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function(e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function() {
    var instance = $.fancybox.getInstance();
    var SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document, $) {
  "use strict";

  // Collection of methods supported by user browser
  var fn = (function() {
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // new WebKit
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      // old WebKit (Safari 5.1)
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];

    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  })();

  // If browser does not have Full Screen API, then simply unset default button template and stop
  if (!fn) {
    if ($ && $.fancybox) {
      $.fancybox.defaults.btnTpl.fullScreen = false;
    }

    return;
  }

  var FullScreen = {
    request: function(elem) {
      elem = elem || document.documentElement;

      elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function() {
      return Boolean(document[fn.fullscreenElement]);
    },
    enabled: function() {
      return Boolean(document[fn.fullscreenEnabled]);
    }
  };

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      fullScreen:
        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M9,12 v16 h22 v-16 h-22 v8" />' +
        "</svg>" +
        "</button>"
    },
    fullScreen: {
      autoStart: false
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var $container;

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;

        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        }

        // Expose API
        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();

        instance.FullScreen.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });

  $(document).on(fn.fullscreenchange, function() {
    var isFullscreen = FullScreen.isFullscreen(),
      instance = $.fancybox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.current.$content.css("transition", "none");

        instance.isAnimating = false;

        instance.update(true, true, 0);
      }

      instance.trigger("onFullscreenChange", isFullscreen);

      instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
    }
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active",
    CLASS_LOAD = CLASS + "-loading";

  // Make sure there are default values
  $.fancybox.defaults = $.extend(
    true,
    {
      btnTpl: {
        thumbs:
          '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
          '<svg viewBox="0 0 120 120">' +
          '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
          "</svg>" +
          "</button>"
      },
      thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
      }
    },
    $.fancybox.defaults
  );

  var FancyThumbs = function(instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,

    init: function(instance) {
      var self = this,
        first,
        second;

      self.instance = instance;

      instance.Thumbs = self;

      self.opts = instance.group[instance.currIndex].opts.thumbs;

      // Enable thumbs if at least two group items have thumbnails
      first = instance.group[0];
      first = first.opts.thumb || (first.opts.$thumb && first.opts.$thumb.length ? first.opts.$thumb.attr("src") : false);

      if (instance.group.length > 1) {
        second = instance.group[1];
        second = second.opts.thumb || (second.opts.$thumb && second.opts.$thumb.length ? second.opts.$thumb.attr("src") : false);
      }

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      if (self.opts && first && second && first && second) {
        self.$button.show().on("click", function() {
          self.toggle();
        });

        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },

    create: function() {
      var self = this,
        instance = self.instance,
        parentEl = self.opts.parentEl,
        list = [],
        src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
          instance.$refs.container
            .find(parentEl)
            .addBack()
            .filter(parentEl)
        );

        // Add "click" event that performs gallery navigation
        self.$grid.on("click", "li", function() {
          instance.jumpTo($(this).attr("data-index"));
        });
      }

      // Build the list
      if (!self.$list) {
        self.$list = $("<ul>").appendTo(self.$grid);
      }

      $.each(instance.group, function(i, item) {
        src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr("src") : null);

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push(
          '<li data-index="' +
            i +
            '" tabindex="0" class="' +
            CLASS_LOAD +
            '"' +
            (src && src.length ? ' style="background-image:url(' + src + ')" />' : "") +
            "></li>"
        );
      });

      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(
          parseInt(self.$grid.css("padding-right"), 10) +
            instance.group.length *
              self.$list
                .children()
                .eq(0)
                .outerWidth(true)
        );
      }
    },

    focus: function(duration) {
      var self = this,
        $list = self.$list,
        $grid = self.$grid,
        thumb,
        thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list
        .children()
        .removeClass(CLASS_ACTIVE)
        .filter('[data-index="' + self.instance.current.index + '"]')
        .addClass(CLASS_ACTIVE);

      thumbPos = thumb.position();

      // Check if need to scroll to make current thumb visible
      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate(
          {
            scrollTop: $list.scrollTop() + thumbPos.top
          },
          duration
        );
      } else if (
        self.opts.axis === "x" &&
        (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
      ) {
        $list
          .parent()
          .stop()
          .animate(
            {
              scrollLeft: thumbPos.left
            },
            duration
          );
      }
    },

    update: function() {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");

        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      }

      // Update content position
      that.instance.update();
    },

    hide: function() {
      this.isVisible = false;
      this.update();
    },

    show: function() {
      this.isVisible = true;
      this.update();
    },

    toggle: function() {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },

    "beforeShow.fb": function(e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs;

      // "G"
      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();

        Thumbs.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, window.jQuery || jQuery);

//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share:
        '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
        "</svg>" +
        "</button>"
    },
    share: {
      url: function(instance, item) {
        return (
          (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
        );
      },
      tpl:
        '<div class="fancybox-share">' +
        "<h1>{{SHARE}}</h1>" +
        "<p>" +
        '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
        "<span>Facebook</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
        "<span>Twitter</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
        "<span>Pinterest</span>" +
        "</a>" +
        "</p>" +
        '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p>' +
        "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };

    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function() {
    var instance = $.fancybox.getInstance(),
      current = instance.current || null,
      url,
      tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        animationEffect: false,
        afterLoad: function(shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function() {
            shareInstance.close(null, 0);
          });

          // Opening links in a popup window
          shareCurrent.$content.find(".fancybox-share__links a").click(function() {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        }
      }
    });
  });
})(document, window.jQuery || jQuery);

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(document, window, $) {
  "use strict";

  // Simple $.escapeSelector polyfill (for jQuery prior v3)
  if (!$.escapeSelector) {
    $.escapeSelector = function(sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      var fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          }

          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  }

  // Get info about gallery name and current index from url
  function parseUrl() {
    var hash = window.location.hash.substr(1),
      rez = hash.split("-"),
      index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
      gallery = rez.join("-");

    return {
      hash: hash,
      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl(url) {
    var $el;

    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute, then trigger click event for that.
      // It should start fancyBox
      $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
        .eq(url.index - 1)
        .trigger("click.fb-start");
    }
  }

  // Get gallery name from current instance
  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") : "");

    return ret === "" ? false : ret;
  }

  // Start when DOM becomes ready
  $(function() {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    }

    // Update hash when opening/closing fancyBox
    $(document).on({
      "onInit.fb": function(e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance);

        // Make sure gallery start index matches index from hash
        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },

      "beforeShow.fb": function(e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        }

        // Check if need to update window hash
        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        }

        // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected
        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

        // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (!instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        }

        // Update hash
        instance.hashTimer = setTimeout(function() {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"](
              {},
              document.title,
              window.location.pathname + window.location.search + "#" + instance.currentHash
            );

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },

      "beforeClose.fb": function(e, instance, current) {
        var gallery;

        if (current.opts.hash === false) {
          return;
        }

        gallery = getGalleryID(instance);

        // Goto previous history entry
        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;

        clearTimeout(instance.hashTimer);
      }
    });

    // Check if need to start/close after url has changed
    $(window).on("hashchange.fb", function() {
      var url = parseUrl(),
        fb;

      // Find last fancyBox instance that has "hash"
      $.each(
        $(".fancybox-container")
          .get()
          .reverse(),
        function(index, value) {
          var tmp = $(value).data("FancyBox");
          //isClosing
          if (tmp.currentHash) {
            fb = tmp;
            return false;
          }
        }
      );

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash && fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;

          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    });

    // Check current hash and trigger click event on matching element to start fancyBox, if needed
    setTimeout(function() {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(document, window, window.jQuery || jQuery);

// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var prevTime = new Date().getTime();

  $(document).on({
    "onInit.fb": function(e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;

        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, window.jQuery || jQuery);

/*! formstone v0.6.9 [mediaquery.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(b){b=b||{};for(var c in t)t.hasOwnProperty(c)&&(l[c]=b[c]?a.merge(b[c],l[c]):l[c]);l=a.extend(l,b),l.minWidth.sort(p.sortDesc),l.maxWidth.sort(p.sortAsc),l.minHeight.sort(p.sortDesc),l.maxHeight.sort(p.sortAsc);for(var d in t)if(t.hasOwnProperty(d)){s[d]={};for(var e in l[d])if(l[d].hasOwnProperty(e)){var f=window.matchMedia("("+t[d]+": "+(l[d][e]===1/0?1e5:l[d][e])+l.unit+")");f.addListener(g),s[d][l[d][e]]=f}}g()}function d(a,b,c){var d=o.matchMedia(b),e=i(d.media);r[e]||(r[e]={mq:d,active:!0,enter:{},leave:{}},r[e].mq.addListener(h));for(var f in c)c.hasOwnProperty(f)&&r[e].hasOwnProperty(f)&&(r[e][f][a]=c[f]);h(r[e].mq)}function e(a,b){if(a)if(b){var c=i(b);r[c]&&(r[c].enter[a]&&delete r[c].enter[a],r[c].leave[a]&&delete r[c].leave[a])}else for(var d in r)r.hasOwnProperty(d)&&(r[d].enter[a]&&delete r[d].enter[a],r[d].leave[a]&&delete r[d].leave[a])}function f(){q={unit:l.unit};for(var a in t)if(t.hasOwnProperty(a))for(var b in s[a])if(s[a].hasOwnProperty(b)&&s[a][b].matches){var c="Infinity"===b?1/0:parseInt(b,10);a.indexOf("max")>-1?(!q[a]||c<q[a])&&(q[a]=c):(!q[a]||c>q[a])&&(q[a]=c)}}function g(){f(),n.trigger(m.mqChange,[q])}function h(a){var b=i(a.media),c=r[b],d=a.matches?m.enter:m.leave;if(c&&c.active||!c.active&&a.matches){for(var e in c[d])c[d].hasOwnProperty(e)&&c[d][e].apply(c.mq);c.active=!0}}function i(a){return a.replace(/[^a-z0-9\s]/gi,"").replace(/[_\s]/g,"").replace(/^\s+|\s+$/g,"")}function j(){return q}var k=b.Plugin("mediaquery",{utilities:{_initialize:c,state:j,bind:d,unbind:e},events:{mqChange:"mqchange"}}),l={minWidth:[0],maxWidth:[1/0],minHeight:[0],maxHeight:[1/0],unit:"px"},m=a.extend(k.events,{enter:"enter",leave:"leave"}),n=b.$window,o=n[0],p=k.functions,q=null,r=[],s={},t={minWidth:"min-width",maxWidth:"max-width",minHeight:"min-height",maxHeight:"max-height"}}(jQuery,Formstone);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name setup
	 * @description Setup plugin.
	 */

	function setup() {
		$Locks = $("html, body");
	}

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		// guid
		data.handleGuid   = RawClasses.handle + data.guid;

		data.isToggle     = (data.type === "toggle");
		data.open         = false;

		if (data.isToggle) {
			data.gravity  = "";
		}

		var baseClass     = RawClasses.base,
			typeClass     = [baseClass, data.type].join("-"),
			gravityClass  = data.gravity ? [typeClass, data.gravity].join("-") : "",
			classGroup    = [data.rawGuid, data.customClass].join(" ");

		data.handle       = this.data(Namespace + "-handle");
		data.content      = this.data(Namespace + "-content");

		data.handleClasses = [
			RawClasses.handle,
			RawClasses.handle.replace(baseClass, typeClass),
			gravityClass ? RawClasses.handle.replace(baseClass, gravityClass) : "",
			data.handleGuid,
			classGroup
		].join(" ");

		data.navClasses = [
			RawClasses.nav.replace(baseClass, typeClass),
			gravityClass ? RawClasses.nav.replace(baseClass, gravityClass) : "",
			classGroup
		].join(" ");

		data.contentClasses = [
			RawClasses.content.replace(baseClass, typeClass),
			gravityClass ? RawClasses.content.replace(baseClass, gravityClass) : "",
			classGroup
		].join(" ");

		// DOM

		data.$nav        = this.addClass(data.navClasses);
		data.$handle     = $(data.handle).addClass(data.handleClasses);
		data.$content    = $(data.content).addClass(data.contentClasses);
		data.$animate    = $().add(data.$nav).add(data.$content);

		cacheLabel(data);

		// toggle

		data.$handle.attr("data-swap-target", data.dotGuid)
					.attr("data-swap-linked", "." + data.handleGuid)
					.attr("data-swap-group", RawClasses.base)
					.on("activate.swap" + data.dotGuid, data, onOpen)
					.on("deactivate.swap" + data.dotGuid, data, onClose)
					.on("enable.swap" + data.dotGuid, data, onEnable)
					.on("disable.swap" + data.dotGuid, data, onDisable)
					.fsSwap({
						maxWidth: data.maxWidth,
						classes: {
							target  : data.dotGuid,
							enabled : Classes.enabled,
							active  : Classes.open,
							raw: {
								target  : data.rawGuid,
								enabled : RawClasses.enabled,
								active  : RawClasses.open
							}
						}
					});
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		data.$content.removeClass(data.contentClasses)
					 .off(Events.namespace);

		data.$handle.removeAttr("data-swap-target")
					.removeData("swap-target")
					.removeAttr("data-swap-linked")
					.removeData("swap-linked")
					.removeClass(data.handleClasses)
					.off(data.dotGuid)
					.text(data.originalLabel)
					.fsSwap("destroy");

		restoreLabel(data);

		clearLocks(data);

		this.removeClass(data.navClasses)
			.off(Events.namespace);
	}

	/**
	 * @method
	 * @name open
	 * @description Opens instance.
	 * @example $(".target").navigation("open");
	 */

	function open(data) {
		data.$handle.fsSwap("activate");
	}

	/**
	 * @method
	 * @name close
	 * @description Closes instance.
	 * @example $(".target").navigation("close");
	 */

	function close(data) {
		data.$handle.fsSwap("deactivate");
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables instance.
	 * @example $(".target").navigation("enable");
	 */

	function enable(data) {
		data.$handle.fsSwap("enable");
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables instance.
	 * @example $(".target").navigation("disable");
	 */

	function disable(data) {
		data.$handle.fsSwap("disable");
	}

	/**
	 * @method private
	 * @name onOpen
	 * @description Handles nav open event.
	 * @param e [object] "Event data"
	 */

	function onOpen(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (!data.open) {
				data.$el.trigger(Events.open);

				data.$content.addClass(RawClasses.open)
							 .one(Events.clickTouchStart, function() {
								close(data);
							 });

				if (data.label) {
					data.$handle.text(data.labels.open);
				}

				addLocks(data);

				data.open = true;
			}
		}
	}

	/**
	 * @method private
	 * @name onClose
	 * @description Handles nav close event.
	 * @param e [object] "Event data"
	 */

	function onClose(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (data.open) {
				data.$el.trigger(Events.close);

				data.$content.removeClass(RawClasses.open)
							 .off(Events.namespace);

				if (data.label) {
					data.$handle.text(data.labels.closed);
				}

				clearLocks(data);

				data.open = false;
			}
		}
	}

	/**
	 * @method private
	 * @name onEnable
	 * @description Handles nav enable event.
	 * @param e [object] "Event data"
	 */

	function onEnable(e) {
		var data = e.data;

		data.$content.addClass(RawClasses.enabled);

		setTimeout(function() {
			data.$animate.addClass(RawClasses.animated);
		}, 0);

		if (data.label) {
			data.$handle.text(data.labels.closed);
		}
	}

	/**
	 * @method private
	 * @name onDisable
	 * @description Handles nav disable event.
	 * @param e [object] "Event data"
	 */

	function onDisable(e) {
		var data = e.data;

		data.$content.removeClass(RawClasses.enabled, RawClasses.animated);
		data.$animate.removeClass(RawClasses.animated);

		restoreLabel(data);

		clearLocks(data);
	}

	/**
	 * @method private
	 * @name addLocks
	 * @description Locks scrolling
	 * @param data [object] "Instance data"
	 */

	function addLocks(data) {
		if (!data.isToggle) {
			$Locks.addClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name clearLocks
	 * @description Unlocks scrolling
	 * @param data [object] "Instance data"
	 */

	function clearLocks(data) {
		if (!data.isToggle) {
			$Locks.removeClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name cacheLabel
	 * @description Sets handle labels
	 * @param data [object] "Instance data"
	 */

	function cacheLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				data.originalLabel = [];

				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.originalLabel[i] = data.$handle.eq(i).text();
				}
			} else {
				data.originalLabel = data.$handle.text();
			}
		}
	}

	/**
	 * @method private
	 * @name restoreLabel
	 * @description restores handle labels
	 * @param data [object] "Instance data"
	 */

	function restoreLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.$handle.eq(i).text(data.originalLabel[i]);
				}
			} else {
				data.$handle.text(data.originalLabel);
			}
		}
	}

	/**
	 * @plugin
	 * @name Navigation
	 * @description A jQuery plugin for simple responsive navigation.
	 * @type widget
	 * @dependency core.js
	 * @dependency mediaquery.js
	 * @dependency swap.js
	 * @dependency touch.js
	 */

	var Plugin = Formstone.Plugin("navigation", {
			widget: true,

			/**
			 * @options
			 * @param customClass [string] <''> "Class applied to instance"
			 * @param gravity [string] <'left'> "Gravity of 'push', 'reveal' and 'overlay' navigation; 'right', 'left'"
			 * @param label [boolean] <true> "Display handle width label"
			 * @param labels.closed [string] <'Menu'> "Closed state text"
			 * @param labels.open [string] <'Close'> "Open state text"
			 * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
			 * @param type [string] <'toggle'> "Type of navigation; 'toggle', 'push', 'reveal', 'overlay'"
			 */

			defaults: {
				customClass    : "",
				gravity        : "left",
				label          : true,
				labels: {
					closed     : "Menu",
					open       : "Close"
				},
				maxWidth       : "980px",
				type           : "toggle"
			},

			classes: [
				"handle",
				"nav",
				"content",
				"animated",
				"enabled",
				"open",
				"toggle",
				"push",
				"reveal",
				"overlay",
				"left",
				"right",
				"lock"
			],

			/**
			 * @events
			 * @event open.navigation "Navigation opened"
			 * @event close.navigation "Navigation closed"
			 */

			events: {
				tap      : "tap",
				open     : "open",
				close    : "close"
			},

			methods: {
				_setup        : setup,
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				open          : open,
				close         : close,
				enable        : enable,
				disable       : disable
			}
		}),

		// Localize References

		Namespace     = Plugin.namespace,
		Classes       = Plugin.classes,
		RawClasses    = Classes.raw,
		Events        = Plugin.events,
		Functions     = Plugin.functions,

		// Internal

		$Locks        = null;

})(jQuery, Formstone);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		data.enabled    = false;
		data.active     = false;

		data.classes    = $.extend(true, {}, Classes, data.classes);

		data.target     = this.data(Namespace + "-target");
		data.$target    = $(data.target).addClass(data.classes.raw.target);

		data.linked     = this.data(Namespace + "-linked");

		data.mq         = "(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")";

		// live query for the group to avoid missing new elements
		var group       = this.data(Namespace + "-group");
		data.group      = group ? '[data-' + Namespace + '-group="' + group + '"]' : false;

		if (!data.collapse && data.group) {
			$(data.group).eq(0).attr("data-" + Namespace + "-active", "true");
		}

		// Should be activate when enabled
		data.onEnable = this.data(Namespace + "-active");

		data.$swaps = $().add(this).add(data.$target);

		this.fsTouch({
				tap: true
			})
			.on(Events.tap + data.dotGuid, data, onClick);

		// Media Query support
		$.fsMediaquery("bind", data.rawGuid, data.mq, {
			enter: function() {
				enable.call(data.$el, data);
			},
			leave: function() {
				disable.call(data.$el, data);
			}
		});
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		$.fsMediaquery("unbind", data.rawGuid);

		data.$swaps.removeClass( [data.classes.raw.enabled, data.classes.raw.active].join(" ") )
				   .off(Events.namespace);

		this.fsTouch("destroy");
	}

	/**
	 * @method
	 * @name activate
	 * @description Activate instance.
	 * @example $(".target").swap("activate");
	 */

	function activate(data, fromLinked) {
		if (data.enabled && !data.active) {
			// Deactivates grouped instances
			$(data.group).not(data.$el)[Plugin.namespaceClean]("deactivate");

			// index in group
			var index    = (data.group) ? $(data.group).index(data.$el) : null;

			data.$swaps.addClass(data.classes.raw.active);

			if (!fromLinked) {
				if (data.linked) {
					// Linked handles
					$(data.linked).not(data.$el).swap("activate", true);
				}

				this.trigger(Events.activate, [index]);
			}

			data.active = true;
		}
	}

	/**
	 * @method
	 * @name deactivate
	 * @description Deactivates instance.
	 * @example $(".target").swap("deactivate");
	 */

	function deactivate(data, fromLinked) {
		if (data.enabled && data.active) {
			data.$swaps.removeClass(data.classes.raw.active);

			if (!fromLinked) {
				if (data.linked) {
					// Linked handles
					$(data.linked).not(data.$el).swap("deactivate", true);
				}

				this.trigger(Events.deactivate);
			}

			data.active = false;
		}
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables instance.
	 * @example $(".target").swap("enable");
	 */

	function enable(data, fromLinked) {
		if (!data.enabled) {
			data.enabled = true;

			data.$swaps.addClass(data.classes.raw.enabled);

			if (!fromLinked) {
				// Linked handles
				$(data.linked).not(data.$el).swap("enable");
			}

			this.trigger(Events.enable);

			if (data.onEnable) {
				data.active = true;
				data.$swaps.addClass(data.classes.raw.active);
				// activate.call(this, data);
			} else {
				data.active = true;
				deactivate.call(this, data);
			}
		}
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables instance.
	 * @example $(".target").swap("disable");
	 */

	function disable(data, fromLinked) {
		if (data.enabled) {
			data.enabled = false;

			data.$swaps.removeClass( [data.classes.raw.enabled, data.classes.raw.active].join(" ") );

			if (!fromLinked) {
				// Linked handles
				$(data.linked).not(data.$el).swap("disable");
			}

			this.trigger(Events.disable);
		}
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click nav click.
	 * @param e [object] "Event data"
	 */

	function onClick(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (data.active && data.collapse) {
			deactivate.call(data.$el, data);
		} else {
			activate.call(data.$el, data);
		}
	}

	/**
	 * @plugin
	 * @name Swap
	 * @description A jQuery plugin for toggling states.
	 * @type widget
	 * @dependency core.js
	 * @dependency mediaquery.js
	 * @dependency touch.js
	 */

	var Plugin = Formstone.Plugin("swap", {
			widget: true,

			/**
			 * @options
			 * @param collapse [boolean] <true> "Allow swap to collapse it's target"
			 * @param maxWidth [string] <Infinity> "Width at which to auto-disable plugin"
			 */

			defaults: {
				collapse       : true,
				maxWidth       : Infinity
			},

			classes: [
				"target",
				"enabled",
				"active"
			],

			/**
			 * @events
			 * @event activate.swap "Swap activated"
			 * @event deactivate.swap "Swap deactivated"
			 * @event enable.swap "Swap enabled"
			 * @event disable.swap "Swap diabled"
			 */

			events: {
				tap           : "tap",
				activate      : "activate",
				deactivate    : "deactivate",
				enable        : "enable",
				disable       : "disable"
			},

			methods: {
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				activate      : activate,
				deactivate    : deactivate,
				enable        : enable,
				disable       : disable
			}
		}),

		// Localize References

		Namespace     = Plugin.namespace,
		Classes       = Plugin.classes,
		Events        = Plugin.events,
		Functions     = Plugin.functions;

})(jQuery, Formstone);
/*!
 * Flickity PACKAGED v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {



function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-selected', 'false' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.removeAttribute('aria-selected');
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/slide',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.changeSelected( true );
};

proto.unselect = function() {
  this.changeSelected( false );
};

proto.changeSelected = function( isSelected ) {
  var classMethod = isSelected ? 'add' : 'remove';
  this.cells.forEach( function( cell ) {
    cell.element.classList[ classMethod ]('is-selected');
    cell.element.setAttribute( 'aria-selected', isSelected.toString() );
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {



// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  x = x + this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var value = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = this.isAnimating ?
    'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';

  // scroll event
  var firstSlide = this.slides[0];
  if ( firstSlide ) {
    var positionX = -this.x - firstSlide.target;
    var progress = positionX / this.slidesWidth;
    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
  }
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/flickity',[
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {



// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');

  var index;
  var initialIndex = this.options.initialIndex;
  if ( this.isInitActivated ) {
    index = this.selectedIndex;
  } else if ( initialIndex !== undefined ) {
    index = this.cells[ initialIndex ] ? initialIndex : 0;
  } else {
    index = 0;
  }
  // select instantly
  this.select( index, false, true );
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

proto.childUIPointerDown = function( event ) {
  this.emitEvent( 'childUIPointerDown', [ event ] );
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;

return Flickity;

}));

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {



function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {



// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

proto._childUIPointerDownDrag = function( event ) {
  // allow focus & preventDefault even when not draggable
  // so child UI elements keep focus on carousel. #721
  event.preventDefault();
  this.pointerDownFocus( event );
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  this.pointerDownPointer = pointer;
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

/*!
 * Tap listener v2.0.0
 * listens to taps
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false*/ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'tap-listener/tap-listener',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.TapListener = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// --------------------------  TapListener -------------------------- //

function TapListener( elem ) {
  this.bindTap( elem );
}

// inherit Unipointer & EventEmitter
var proto = TapListener.prototype = Object.create( Unipointer.prototype );

/**
 * bind tap event to element
 * @param {Element} elem
 */
proto.bindTap = function( elem ) {
  if ( !elem ) {
    return;
  }
  this.unbindTap();
  this.tapElement = elem;
  this._bindStartEvent( elem, true );
};

proto.unbindTap = function() {
  if ( !this.tapElement ) {
    return;
  }
  this._bindStartEvent( this.tapElement, true );
  delete this.tapElement;
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  var pointerPoint = Unipointer.getPointerPoint( pointer );
  var boundingRect = this.tapElement.getBoundingClientRect();
  var scrollX = window.pageXOffset;
  var scrollY = window.pageYOffset;
  // calculate if pointer is inside tapElement
  var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
    pointerPoint.x <= boundingRect.right + scrollX &&
    pointerPoint.y >= boundingRect.top + scrollY &&
    pointerPoint.y <= boundingRect.bottom + scrollY;
  // trigger callback if pointer is inside element
  if ( isInside ) {
    this.emitEvent( 'tap', [ event, pointer ] );
  }

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    var _this = this;
    setTimeout( function() {
      delete _this.isIgnoringMouseUp;
    }, 400 );
  }
};

proto.destroy = function() {
  this.pointerDone();
  this.unbindTap();
};

// -----  ----- //

return TapListener;

}));

// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/prev-next-button',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( TapListener.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.on( 'tap', this.onTap );
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindTap( this.element );
  // click events from keyboard
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // do regular TapListener destroy
  TapListener.prototype.destroy.call( this );
  // click events from keyboard
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.onTap = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function( event ) {
  // only allow clicks from keyboard
  var focused = document.activeElement;
  if ( focused && focused == this.element ) {
    this.onTap( event, event );
  }
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'tap-listener/tap-listener',
      'fizzy-ui-utils/utils'
    ], function( Flickity, TapListener, utils ) {
      return factory( window, Flickity, TapListener, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('tap-listener'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.TapListener,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, TapListener, utils ) {

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = new TapListener();

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.on( 'tap', this.onTap );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.bindTap( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.holder );
  TapListener.prototype.destroy.call( this );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {



// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {



// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

/*!
 * Flickity v2.1.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

/*!
 * Flickity asNavFor v2.0.1
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() {
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( asNavForOption );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  if ( !this.navCompanion ) {
    return;
  }
  // select slide that matches first cell of slide
  var selectedCell = this.navCompanion.selectedCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) {
    return;
  }

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) {
    return cell.element;
  });
  this.changeNavSelectedClass('add');
};

function lerp( a, b, t ) {
  return ( b - a ) * t + a;
}

proto.changeNavSelectedClass = function( method ) {
  this.navSelectedElements.forEach( function( navElem ) {
    navElem.classList[ method ]('is-nav-selected');
  });
};

proto.activateAsNavFor = function() {
  this.navCompanionSelect( true );
};

proto.removeNavSelectedElements = function() {
  if ( !this.navSelectedElements ) {
    return;
  }
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
};

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
  if ( typeof cellIndex == 'number' ) {
    this.navCompanion.selectCell( cellIndex );
  }
};

proto.deactivateAsNavFor = function() {
  this.removeNavSelectedElements();
};

proto.destroyAsNavFor = function() {
  if ( !this.navCompanion ) {
    return;
  }
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));


;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		data.touches     = [];
		data.touching    = false;

		this.on( Events.dragStart, Functions.killEvent );

		if (data.tap) {
			// Tap

			data.pan   = false;
			data.scale = false;
			data.swipe = false;

			if (Formstone.support.touch) {
				this.on( [Events.touchStart, Events.pointerDown].join(" "), data, onPointerStart);
			} else {
				this.on(Events.click, data, onClick);
			}
		} else if (data.pan || data.swipe || data.scale) {
			// Pan / Swipe / Scale

			data.tap = false;

			if (data.swipe) {
				data.pan = true;
			}

			if (data.scale) {
				data.axis = false;
			}

			if (data.axis) {
				data.axisX = data.axis === "x";
				data.axisY = data.axis === "y";

				// touchAction(this, "pan-" + (data.axisY ? "y" : "x"));
			} else {
				touchAction(this, "none");
			}

			this.on( [Events.touchStart, Events.pointerDown].join(" "), data, onTouch);

			if (data.pan && !Formstone.support.touch) {
				this.on( Events.mouseDown, data, onPointerStart);
			}
		}
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		this.off(Events.namespace);

		touchAction(this, "");
	}

	/**
	 * @method private
	 * @name onTouch
	 * @description Delegates touch events.
	 * @param e [object] "Event data"
	 */

	function onTouch(e) {
		// Stop panning and zooming
		if (e.preventManipulation) {
			e.preventManipulation();
		}

		var data    = e.data,
			oe      = e.originalEvent;

		if (oe.type.match(/(up|end)$/i)) {
			onPointerEnd(e);
			return;
		}

		if (oe.pointerId) {
			// Normalize MS pointer events back to standard touches
			var activeTouch = false;
			for (var i in data.touches) {
				if (data.touches[i].id === oe.pointerId) {
					activeTouch = true;
					data.touches[i].pageX    = oe.clientX;
					data.touches[i].pageY    = oe.clientY;
				}
			}
			if (!activeTouch) {
				data.touches.push({
					id       : oe.pointerId,
					pageX    : oe.clientX,
					pageY    : oe.clientY
				});
			}
		} else {
			// Alias normal touches
			data.touches = oe.touches;
		}

		// Delegate touch actions
		if (oe.type.match(/(down|start)$/i)) {
			onPointerStart(e);
		} else if (oe.type.match(/move$/i)) {
			onPointerMove(e);
		}
	}

	/**
	 * @method private
	 * @name onPointerStart
	 * @description Handles pointer start.
	 * @param e [object] "Event data"
	 */

	function onPointerStart(e) {
		var data     = e.data,
			touch    = ($.type(data.touches) !== "undefined") ? data.touches[0] : null;

		if (!data.touching) {
			data.startE      = e.originalEvent;
			data.startX      = (touch) ? touch.pageX : e.pageX;
			data.startY      = (touch) ? touch.pageY : e.pageY;
			data.startT      = new Date().getTime();
			data.scaleD      = 1;
			data.passed      = false;
		}

		if (data.tap) {
			// Tap

			data.clicked = false;

			data.$el.on( [Events.touchMove, Events.pointerMove].join(" "), data, onTouch)
					.on( [Events.touchEnd, Events.touchCancel, Events.pointerUp, Events.pointerCancel].join(" ") , data, onTouch);

		} else if (data.pan || data.scale) {
			// Clear old click events

			if (data.$links) {
				data.$links.off(Events.click);
			}

			// Pan / Scale

			var newE = buildEvent(data.scale ? Events.scaleStart : Events.panStart, e, data.startX, data.startY, data.scaleD, 0, 0, "", "");

			if (data.scale && data.touches && data.touches.length >= 2) {
				var t = data.touches;

				data.pinch = {
					startX     : midpoint(t[0].pageX, t[1].pageX),
					startY     : midpoint(t[0].pageY, t[1].pageY),
					startD     : pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY))
				};

				newE.pageX    = data.startX   = data.pinch.startX;
				newE.pageY    = data.startY   = data.pinch.startY;
			}

			// Only bind at first touch
			if (!data.touching) {
				data.touching = true;

				if (data.pan) {
					$Window.on(Events.mouseMove, data, onPointerMove)
						   .on(Events.mouseUp, data, onPointerEnd);
				}

				$Window.on( [
					Events.touchMove,
					Events.touchEnd,
					Events.touchCancel,
					Events.pointerMove,
					Events.pointerUp,
					Events.pointerCancel
				].join(" ") , data, onTouch);

				data.$el.trigger(newE);
			}
		}
	}

	/**
	 * @method private
	 * @name onPointerMove
	 * @description Handles pointer move.
	 * @param e [object] "Event data"
	 */

	function onPointerMove(e) {
		var data      = e.data,
			touch     = ($.type(data.touches) !== "undefined") ? data.touches[0] : null,
			newX      = (touch) ? touch.pageX : e.pageX,
			newY      = (touch) ? touch.pageY : e.pageY,
			deltaX    = newX - data.startX,
			deltaY    = newY - data.startY,
			dirX      = (deltaX > 0) ? "right" : "left",
			dirY      = (deltaY > 0) ? "down"  : "up",
			movedX    = Math.abs(deltaX) > TouchThreshold,
			movedY    = Math.abs(deltaY) > TouchThreshold;

		if (data.tap) {
			// Tap

			if (movedX || movedY) {
				data.$el.off( [
					Events.touchMove,
					Events.touchEnd,
					Events.touchCancel,
					Events.pointerMove,
					Events.pointerUp,
					Events.pointerCancel
				].join(" ") );
			}
		} else if (data.pan || data.scale) {
			if (!data.passed && data.axis && ((data.axisX && movedY) || (data.axisY && movedX)) ) {
				// if axis and moved in opposite direction
				onPointerEnd(e);
			} else {
				if (!data.passed && (!data.axis || (data.axis && (data.axisX && movedX) || (data.axisY && movedY)))) {
					// if has axis and moved in same direction
					data.passed = true;
				}

				if (data.passed) {
					Functions.killEvent(e);
					Functions.killEvent(data.startE);
				}

				// Pan / Scale

				var fire    = true,
					newE    = buildEvent(data.scale ? Events.scale : Events.pan, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

				if (data.scale) {
					if (data.touches && data.touches.length >= 2) {
						var t = data.touches;

						data.pinch.endX     = midpoint(t[0].pageX, t[1].pageX);
						data.pinch.endY     = midpoint(t[0].pageY, t[1].pageY);
						data.pinch.endD     = pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY));
						data.scaleD    = (data.pinch.endD / data.pinch.startD);
						newE.pageX     = data.pinch.endX;
						newE.pageY     = data.pinch.endY;
						newE.scale     = data.scaleD;
						newE.deltaX    = data.pinch.endX - data.pinch.startX;
						newE.deltaY    = data.pinch.endY - data.pinch.startY;
					} else if (!data.pan) {
						fire = false;
					}
				}

				if (fire) {
					data.$el.trigger( newE );
				}
			}
		}
	}

	/**
	 * @method private
	 * @name bindLink
	 * @description Bind events to internal links
	 * @param $link [object] "Object to bind"
	 * @param data [object] "Instance data"
	 */

	function bindLink($link, data) {
		$link.on(Events.click, data, onLinkClick);

		// http://www.elijahmanor.com/how-to-access-jquerys-internal-data/
		var events = $._data($link[0], "events")["click"];
		events.unshift(events.pop());
	}

	/**
	 * @method private
	 * @name onLinkClick
	 * @description Handles clicks to internal links
	 * @param e [object] "Event data"
	 */

	function onLinkClick(e) {
		Functions.killEvent(e, true);
		e.data.$links.off(Events.click);
	}

	/**
	 * @method private
	 * @name onPointerEnd
	 * @description Handles pointer end / cancel.
	 * @param e [object] "Event data"
	 */

	function onPointerEnd(e) {
		var data = e.data;

		if (data.tap) {
			// Tap

			data.$el.off( [
				Events.touchMove,
				Events.touchEnd,
				Events.touchCancel,
				Events.pointerMove,
				Events.pointerUp,
				Events.pointerCancel,
				Events.mouseMove,
				Events.mouseUp
			].join(" ") );

			data.startE.preventDefault();

			onClick(e);
		} else if (data.pan || data.scale) {

			// Pan / Swipe / Scale

			var touch     = ($.type(data.touches) !== "undefined") ? data.touches[0] : null,
				newX      = (touch) ? touch.pageX : e.pageX,
				newY      = (touch) ? touch.pageY : e.pageY,
				deltaX    = newX - data.startX,
				deltaY    = newY - data.startY,
				endT      = new Date().getTime(),
				eType     = data.scale ? Events.scaleEnd : Events.panEnd,
				dirX      = (deltaX > 0) ? "right" : "left",
				dirY      = (deltaY > 0) ? "down"  : "up",
				movedX    = Math.abs(deltaX) > 1,
				movedY    = Math.abs(deltaY) > 1;

			// Swipe

			if (data.swipe && Math.abs(deltaX) > TouchThreshold && (endT - data.startT) < TouchTime) {
				eType = Events.swipe;
			}

			// Kill clicks to internal links

			if ( (data.axis && ((data.axisX && movedY) || (data.axisY && movedX))) || (movedX || movedY) ) {
				data.$links = data.$el.find("a");

				for (var i = 0, count = data.$links.length; i < count; i++) {
					bindLink(data.$links.eq(i), data);
				}
			}

			var newE = buildEvent(eType, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

			$Window.off( [
				Events.touchMove,
				Events.touchEnd,
				Events.touchCancel,
				Events.mouseMove,
				Events.mouseUp,
				Events.pointerMove,
				Events.pointerUp,
				Events.pointerCancel
			].join(" ") );

			data.$el.trigger(newE);

			data.touches = [];

			if (data.scale) {
				/*
				if (e.originalEvent.pointerId) {
					for (var i in data.touches) {
						if (data.touches[i].id === e.originalEvent.pointerId) {
							data.touches.splice(i, 1);
						}
					}
				} else {
					data.touches = e.originalEvent.touches;
				}
				*/

				/*
				if (data.touches.length) {
					onPointerStart($.extend(e, {
						data: data,
						originalEvent: {
							touches: data.touches
						}
					}));
				}
				*/
			}
		}

		data.touching = false;
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click.
	 * @param e [object] "Event data"
	 */

	function onClick(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (!data.clicked) {
			if (e.type !== "click") {
				data.clicked = true;
			}

			var newX    = (data.startE) ? data.startX : e.pageX,
				newY    = (data.startE) ? data.startY : e.pageY,
				newE    = buildEvent(Events.tap, e.originalEvent, newX, newY, 1, 0, 0);

			data.$el.trigger( newE );
		}
	}

	/**
	 * @method private
	 * @name buildEvents
	 * @description Builds new event.
	 * @param type [type] "Event type"
	 * @param oe [object] "Original event"
	 * @param x [int] "X value"
	 * @param y [int] "Y value"
	 * @param scale [float] "Scale value"
	 * @param dx [float] "Delta X value"
	 * @param dy [float] "Delta Y value"
	 */

	function buildEvent(type, oe, px, py, s, dx, dy, dirx, diry) {
		return $.Event(type, {
			originalEvent : oe,
			bubbles       : true,
			pageX         : px,
			pageY         : py,
			scale         : s,
			deltaX        : dx,
			deltaY        : dy,
			directionX    : dirx,
			directionY    : diry
		});
	}

	/**
	 * @method private
	 * @name midpoint
	 * @description Calculates midpoint.
	 * @param a [float] "Value 1"
	 * @param b [float] "Value 2"
	 */

	function midpoint(a, b) {
		return (a + b) / 2.0;
	}

	/**
	 * @method private
	 * @name pythagorus
	 * @description Pythagorean theorem.
	 * @param a [float] "Value 1"
	 * @param b [float] "Value 2"
	 */

	function pythagorus(a, b) {
		return Math.sqrt((a * a) + (b * b));
	}

	/**
	 * @method private
	 * @name touchAction
	 * @description Set ms touch action on target.
	 * @param action [string] "Touch action value"
	 */

	function touchAction($target, action) {
		$target.css({
			"-ms-touch-action": action,
			    "touch-action": action
		});
	}

	/**
	 * @plugin
	 * @name Touch
	 * @description A jQuery plugin for multi-touch events.
	 * @type widget
	 * @dependency core.js
	 */

	var legacyPointer = !(Formstone.window.PointerEvent),
		Plugin = Formstone.Plugin("touch", {
			widget: true,

			/**
			 * @options
			 * @param axis [string] <null> "Limit axis for pan and swipe; 'x' or 'y'"
			 * @param pan [boolean] <false> "Pan events"
			 * @param scale [boolean] <false> "Scale events"
			 * @param swipe [boolean] <false> "Swipe events"
			 * @param tap [boolean] <false> "'Fastclick' event"
			 */

			defaults : {
				axis     : false,
				pan      : false,
				scale    : false,
				swipe    : false,
				tap      : false
			},

			methods : {
				_construct    : construct,
				_destruct     : destruct
			},

			events: {
				pointerDown    : legacyPointer ? "MSPointerDown"   : "pointerdown",
				pointerUp      : legacyPointer ? "MSPointerUp"     : "pointerup",
				pointerMove    : legacyPointer ? "MSPointerMove"   : "pointermove",
				pointerCancel  : legacyPointer ? "MSPointerCancel" : "pointercancel"
			}
		}),

		// Localize References

		Events        = Plugin.events,
		Functions     = Plugin.functions,

		// Local

		$Window           = Formstone.$window,
		TouchThreshold    = 10,
		TouchTime         = 50;

		/**
		 * @events
		 * @event tap "'Fastclick' event; Prevents ghost clicks on mobile"
		 * @event panstart "Panning started"
		 * @event pan "Panning"
		 * @event panend "Panning ended"
		 * @event scalestart "Scaling started"
		 * @event scale "Scaling"
		 * @event scaleend "Scaling ended"
		 * @event swipe "Swipe"
		 */

		Events.tap           = "tap";
		Events.pan           = "pan";
		Events.panStart      = "panstart";
		Events.panEnd        = "panend";
		Events.scale         = "scale";
		Events.scaleStart    = "scalestart";
		Events.scaleEnd      = "scaleend";
		Events.swipe         = "swipe";

})(jQuery, Formstone);

$(function(){
	$('.main-nav').setup_navigation();
});

var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

$.fn.setup_navigation = function(settings) {

	settings = jQuery.extend({
		menuHoverClass: 'show-menu',
	}, settings);

	// Add ARIA role to menubar and menu items
	$(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');

	var top_level_links = $(this).find('> li > a');

	// Added by Terrill: (removed temporarily: doesn't fix the JAWS problem after all)
	// Add tabindex="0" to all top-level links
	// Without at least one of these, JAWS doesn't read widget as a menu, despite all the other ARIA
	//$(top_level_links).attr('tabindex','0');

	// Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
	$(top_level_links).next('ul')
		.attr('data-test','true')
		.attr({ 'aria-hidden': 'true', 'role': 'menu' })
		.find('a')
			.attr('tabIndex',-1);

	// Adding aria-haspopup for appropriate items
	$(top_level_links).each(function(){
		if($(this).next('ul').length > 0)
			$(this).parent('li').attr('aria-haspopup', 'true');
	});

	$(top_level_links).hover(function(){
		$(this).closest('ul')
			.attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.find('a').attr('tabIndex',0);
	});
	$(top_level_links).focus(function(){
		$(this).closest('ul')
			// Removed by Terrill
			// The following was adding aria-hidden="false" to root ul since menu is never hidden
			// and seemed to be causing flakiness in JAWS (needs more testing)
			// .attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});

	// Bind arrow keys for navigation
	$(top_level_links).keydown(function(e){
		if(e.keyCode == 37) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').find('> li').last().find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 38) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.last().focus();
			}
		} else if(e.keyCode == 39) {
			e.preventDefault();
			// This is the last item
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').find('> li').first().find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
			}
		} else if(e.keyCode == 13 || e.keyCode == 32) {
			// If submenu is hidden, open it
			e.preventDefault();
			$(this).parent('li').find('ul[aria-hidden=true]')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
		} else if(e.keyCode == 27) {
			e.preventDefault();
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		} else {
			$(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					return false;
				}
			});
		}
	});


	var links = $(top_level_links).parent('li').find('ul').find('a');
	$(links).keydown(function(e){
		if(e.keyCode == 38) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 27 || e.keyCode == 37) {
			e.preventDefault();
			$(this)
				.parents('ul').first()
					.prev('a').focus()
					.parents('ul').first().find('.'+settings.menuHoverClass)
						.attr('aria-hidden', 'true')
						.removeClass(settings.menuHoverClass)
						.find('a')
							.attr('tabIndex',-1);
		} else if(e.keyCode == 32) {
			e.preventDefault();
			window.location = $(this).attr('href');
		} else {
			var found = false;
			$(this).parent('li').nextAll('li').find('a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					found = true;
					return false;
				}
			});

			if(!found) {
				$(this).parent('li').prevAll('li').find('a').each(function(){
					if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
						$(this).focus();
						return false;
					}
				});
			}
		}
	});


	// Hide menu if click or focus occurs outside of navigation
	$(this).find('a').last().keydown(function(e){
		if(e.keyCode == 9) {
			// If the user tabs out of the navigation hide all menus
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		}
	});
	$(document).click(function(){ $('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });

	$(this).click(function(e){
		e.stopPropagation();
	});
}

$(document).ready(function() {

	// add js class to body if javascript enabled
	$('html').removeClass('no-js');

	// $('.main-nav').setup_navigation();

	// Shifter
	$.shifter({
		maxWidth: "768px"
	});

	// Naver
	// $(".naver").naver();
	$(".sec-nav").navigation({
		maxWidth: "979px"
	});

	// Testimonials with flexslider
	$('.testimonials').flexslider({
		animation: "fade",
		directionNav: false
	});

	// $('.familymember').flexslider({
	// 	animation: "fade",
	// 	directionNav: false
	// });

	$('.familymember__slider').flickity({
		cellAlign: 'left',
		contain: true,
		adaptiveHeight: true,
		prevNextButtons: false,
		imagesLoaded: true,
		groupCells: '100%'
	});


	// Photo Gallery using flexslider
	$('.flexslider').flexslider({
		smoothHeight: true,
		slideshow: false
	});


	$('.action-link').click(function() {
		$(this).toggleClass('open');
		$(this).parent().next('.action-content').slideToggle();
		// $('.action-content').slideToggle();
		return false;
	});

	// Timeline
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame)
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
	// end Timeline

});
