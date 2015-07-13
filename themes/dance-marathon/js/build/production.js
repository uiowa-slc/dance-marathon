$(document).ready(function() {

    // Hide the directory navigation
    // $('.division-directory').hide();


    // Show/Hide the directory navigation on-click
    $('.directory-toggle').click(function() {
        $(this).toggleClass("active");
        $('.division-directory').toggleClass("active");
        return false;
    });


    // For small screens - show/hide the search on-click
    $('.search-toggle').click(function() {
        $(this).toggleClass('active');
        $('.division-search').slideToggle();
        return false;
    });


    // For small screens - show the directory
    $('.division-menu').on('click', '.has-subnav a', function() {
        $(this).next().slideToggle('slow');
        $(this).toggleClass('active');

    });

});
/*! formstone v0.6.9 [core.js] 2015-06-17 | MIT License | formstone.it */

var Formstone=this.Formstone=function(a,b,c){"use strict";function d(a){l.Plugins[a].initialized||(l.Plugins[a].methods._setup.call(c),l.Plugins[a].initialized=!0)}function e(a,b,c,d){var e,f={raw:{}};d=d||{};for(e in d)d.hasOwnProperty(e)&&("classes"===a?(f.raw[d[e]]=b+"-"+d[e],f[d[e]]="."+b+"-"+d[e]):(f.raw[e]=d[e],f[e]=d[e]+"."+b));for(e in c)c.hasOwnProperty(e)&&("classes"===a?(f.raw[e]=c[e].replace(/{ns}/g,b),f[e]=c[e].replace(/{ns}/g,"."+b)):(f.raw[e]=c[e].replace(/.{ns}/g,""),f[e]=c[e].replace(/{ns}/g,b)));return f}function f(){var a,b={transition:"transitionend",MozTransition:"transitionend",OTransition:"otransitionend",WebkitTransition:"webkitTransitionEnd"},d=["transition","-webkit-transition"],e={transform:"transform",MozTransform:"-moz-transform",OTransform:"-o-transform",msTransform:"-ms-transform",webkitTransform:"-webkit-transform"},f="transitionend",g="",h="",i=c.createElement("div");for(a in b)if(b.hasOwnProperty(a)&&a in i.style){f=b[a],l.support.transition=!0;break}n.transitionEnd=f+".{ns}";for(a in d)if(d.hasOwnProperty(a)&&d[a]in i.style){g=d[a];break}l.transition=g;for(a in e)if(e.hasOwnProperty(a)&&e[a]in i.style){l.support.transform=!0,h=e[a];break}l.transform=h}function g(){l.windowWidth=l.$window.width(),l.windowHeight=l.$window.height(),o=k.startTimer(o,p,h)}function h(){for(var a in l.ResizeHandlers)l.ResizeHandlers.hasOwnProperty(a)&&l.ResizeHandlers[a].callback.call(b,l.windowWidth,l.windowHeight)}function i(a,b){return parseInt(a.priority)-parseInt(b.priority)}var j=function(){this.Version="0.6.9",this.Plugins={},this.ResizeHandlers=[],this.window=b,this.$window=a(b),this.document=c,this.$document=a(c),this.$body=null,this.windowWidth=0,this.windowHeight=0,this.userAgent=b.navigator.userAgent||b.navigator.vendor||b.opera,this.isFirefox=/Firefox/i.test(this.userAgent),this.isChrome=/Chrome/i.test(this.userAgent),this.isSafari=/Safari/i.test(this.userAgent)&&!this.isChrome,this.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent),this.isFirefoxMobile=this.isFirefox&&this.isMobile,this.transform=null,this.transition=null,this.support={file:!!(b.File&&b.FileList&&b.FileReader),history:!!(b.history&&b.history.pushState&&b.history.replaceState),matchMedia:!(!b.matchMedia&&!b.msMatchMedia),raf:!(!b.requestAnimationFrame||!b.cancelAnimationFrame),touch:!!("ontouchstart"in b||b.DocumentTouch&&c instanceof b.DocumentTouch),transition:!1,transform:!1}},k={killEvent:function(a,b){try{a.preventDefault(),a.stopPropagation(),b&&a.stopImmediatePropagation()}catch(c){}},startTimer:function(a,b,c,d){return k.clearTimer(a),d?setInterval(c,b):setTimeout(c,b)},clearTimer:function(a,b){a&&(b?clearInterval(a):clearTimeout(a),a=null)},sortAsc:function(a,b){return parseInt(b)-parseInt(a)},sortDesc:function(a,b){return parseInt(b)-parseInt(a)}},l=new j,m={base:"{ns}",element:"{ns}-element"},n={namespace:".{ns}",blur:"blur.{ns}",change:"change.{ns}",click:"click.{ns}",dblClick:"dblclick.{ns}",drag:"drag.{ns}",dragEnd:"dragend.{ns}",dragEnter:"dragenter.{ns}",dragLeave:"dragleave.{ns}",dragOver:"dragover.{ns}",dragStart:"dragstart.{ns}",drop:"drop.{ns}",error:"error.{ns}",focus:"focus.{ns}",focusIn:"focusin.{ns}",focusOut:"focusout.{ns}",input:"input.{ns}",keyDown:"keydown.{ns}",keyPress:"keypress.{ns}",keyUp:"keyup.{ns}",load:"load.{ns}",mouseDown:"mousedown.{ns}",mouseEnter:"mouseenter.{ns}",mouseLeave:"mouseleave.{ns}",mouseMove:"mousemove.{ns}",mouseOut:"mouseout.{ns}",mouseOver:"mouseover.{ns}",mouseUp:"mouseup.{ns}",resize:"resize.{ns}",scroll:"scroll.{ns}",select:"select.{ns}",touchCancel:"touchcancel.{ns}",touchEnd:"touchend.{ns}",touchLeave:"touchleave.{ns}",touchMove:"touchmove.{ns}",touchStart:"touchstart.{ns}"};j.prototype.Plugin=function(c,f){return l.Plugins[c]=function(c,f){function g(b){var e="object"===a.type(b);b=a.extend(!0,{},f.defaults||{},e?b:{});for(var g=this,h=0,i=g.length;i>h;h++){var k=g.eq(h);if(!j(k)){var l="__"+f.guid++,m=f.classes.raw.base+l,n=k.data(c+"-options"),o=a.extend(!0,{$el:k,guid:l,rawGuid:m,dotGuid:"."+m},b,"object"===a.type(n)?n:{});k.addClass(f.classes.raw.element).data(t,o),d(c),f.methods._construct.apply(k,[o].concat(Array.prototype.slice.call(arguments,e?1:0)))}}return g}function h(){f.functions.iterate.apply(this,[f.methods._destruct].concat(Array.prototype.slice.call(arguments,1))),this.removeClass(f.classes.raw.element).removeData(t)}function j(a){return a.data(t)}function o(b){if(this instanceof a){var c=f.methods[b];return"object"!==a.type(b)&&b?c&&0!==b.indexOf("_")?f.functions.iterate.apply(this,[c].concat(Array.prototype.slice.call(arguments,1))):this:g.apply(this,arguments)}}function p(c){var d=f.utilities[c]||f.utilities._initialize||!1;return d?d.apply(b,Array.prototype.slice.call(arguments,"object"===a.type(c)?0:1)):void 0}function q(b){f.defaults=a.extend(!0,f.defaults,b||{})}function r(b){for(var c=this,d=0,e=c.length;e>d;d++){var f=c.eq(d),g=j(f)||{};"undefined"!==a.type(g.$el)&&b.apply(f,[g].concat(Array.prototype.slice.call(arguments,1)))}return c}var s="fs-"+c,t="fs"+c.replace(/(^|\s)([a-z])/g,function(a,b,c){return b+c.toUpperCase()});return f.initialized=!1,f.priority=f.priority||10,f.classes=e("classes",s,m,f.classes),f.events=e("events",c,n,f.events),f.functions=a.extend({getData:j,iterate:r},k,f.functions),f.methods=a.extend(!0,{_setup:a.noop,_construct:a.noop,_destruct:a.noop,_resize:!1,destroy:h},f.methods),f.utilities=a.extend(!0,{_initialize:!1,_delegate:!1,defaults:q},f.utilities),f.widget&&(a.fn[c]=a.fn[t]=o),a[c]=a[t]=f.utilities._delegate||p,f.namespace=c,f.namespaceClean=t,f.guid=0,f.methods._resize&&(l.ResizeHandlers.push({namespace:c,priority:f.priority,callback:f.methods._resize}),l.ResizeHandlers.sort(i)),f}(c,f),l.Plugins[c]};var o=null,p=20;return l.$window.on("resize.fs",g),g(),a(function(){l.$body=a("body");for(var b in l.Plugins)l.Plugins.hasOwnProperty(b)&&d(b)}),n.clickTouchStart=n.click+" "+n.touchStart,f(),l}(jQuery,this,document);
/*! formstone v0.6.9 [transition.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(a,c){if(c){a.$target=this.find(a.target),a.$check=a.target?a.$target:this,a.callback=c,a.styles=h(a.$check),a.timer=null;var d=a.$check.css(b.transition+"-duration"),f=parseFloat(d);b.support.transition&&d&&f?this.on(k.transitionEnd,a,e):a.timer=l.startTimer(a.timer,50,function(){g(a)},!0)}}function d(a){l.clearTimer(a.timer,!0),this.off(k.namespace)}function e(b){b.stopPropagation(),b.preventDefault();var c=b.data,d=b.originalEvent,e=c.target?c.$target:c.$el;c.property&&d.propertyName!==c.property||!a(d.target).is(e)||f(c)}function f(a){a.always||a.$el[j.namespace]("destroy"),a.callback.apply(a.$el)}function g(a){var b=h(a.$check);i(a.styles,b)||f(a),a.styles=b}function h(b){var c,d,e,f={};if(b instanceof a&&(b=b[0]),m.getComputedStyle){c=m.getComputedStyle(b,null);for(var g=0,h=c.length;h>g;g++)d=c[g],e=c.getPropertyValue(d),f[d]=e}else if(b.currentStyle){c=b.currentStyle;for(d in c)c[d]&&(f[d]=c[d])}return f}function i(b,c){if(a.type(b)!==a.type(c))return!1;for(var d in b)if(!b.hasOwnProperty(d)||!c.hasOwnProperty(d)||b[d]!==c[d])return!1;return!0}var j=b.Plugin("transition",{widget:!0,defaults:{always:!1,property:null,target:null},methods:{_construct:c,_destruct:d,resolve:f}}),k=j.events,l=j.functions,m=b.window}(jQuery,Formstone);
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
/*! formstone v0.6.9 [mediaquery.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(b){b=b||{};for(var c in t)t.hasOwnProperty(c)&&(l[c]=b[c]?a.merge(b[c],l[c]):l[c]);l=a.extend(l,b),l.minWidth.sort(p.sortDesc),l.maxWidth.sort(p.sortAsc),l.minHeight.sort(p.sortDesc),l.maxHeight.sort(p.sortAsc);for(var d in t)if(t.hasOwnProperty(d)){s[d]={};for(var e in l[d])if(l[d].hasOwnProperty(e)){var f=window.matchMedia("("+t[d]+": "+(l[d][e]===1/0?1e5:l[d][e])+l.unit+")");f.addListener(g),s[d][l[d][e]]=f}}g()}function d(a,b,c){var d=o.matchMedia(b),e=i(d.media);r[e]||(r[e]={mq:d,active:!0,enter:{},leave:{}},r[e].mq.addListener(h));for(var f in c)c.hasOwnProperty(f)&&r[e].hasOwnProperty(f)&&(r[e][f][a]=c[f]);h(r[e].mq)}function e(a,b){if(a)if(b){var c=i(b);r[c]&&(r[c].enter[a]&&delete r[c].enter[a],r[c].leave[a]&&delete r[c].leave[a])}else for(var d in r)r.hasOwnProperty(d)&&(r[d].enter[a]&&delete r[d].enter[a],r[d].leave[a]&&delete r[d].leave[a])}function f(){q={unit:l.unit};for(var a in t)if(t.hasOwnProperty(a))for(var b in s[a])if(s[a].hasOwnProperty(b)&&s[a][b].matches){var c="Infinity"===b?1/0:parseInt(b,10);a.indexOf("max")>-1?(!q[a]||c<q[a])&&(q[a]=c):(!q[a]||c>q[a])&&(q[a]=c)}}function g(){f(),n.trigger(m.mqChange,[q])}function h(a){var b=i(a.media),c=r[b],d=a.matches?m.enter:m.leave;if(c&&c.active||!c.active&&a.matches){for(var e in c[d])c[d].hasOwnProperty(e)&&c[d][e].apply(c.mq);c.active=!0}}function i(a){return a.replace(/[^a-z0-9\s]/gi,"").replace(/[_\s]/g,"").replace(/^\s+|\s+$/g,"")}function j(){return q}var k=b.Plugin("mediaquery",{utilities:{_initialize:c,state:j,bind:d,unbind:e},events:{mqChange:"mqchange"}}),l={minWidth:[0],maxWidth:[1/0],minHeight:[0],maxHeight:[1/0],unit:"px"},m=a.extend(k.events,{enter:"enter",leave:"leave"}),n=b.$window,o=n[0],p=k.functions,q=null,r=[],s={},t={minWidth:"min-width",maxWidth:"max-width",minHeight:"min-height",maxHeight:"max-height"}}(jQuery,Formstone);
/*! formstone v0.6.9 [navigation.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(){w=a("html, body")}function d(b){b.handleGuid=u.handle+b.guid,b.isToggle="toggle"===b.type,b.open=!1,b.isToggle&&(b.gravity="");var c=u.base,d=[c,b.type].join("-"),e=b.gravity?[d,b.gravity].join("-"):"",f=[b.rawGuid,b.customClass].join(" ");b.handle=this.data(s+"-handle"),b.content=this.data(s+"-content"),b.handleClasses=[u.handle,u.handle.replace(c,d),e?u.handle.replace(c,e):"",b.handleGuid,f].join(" "),b.navClasses=[u.nav.replace(c,d),e?u.nav.replace(c,e):"",f].join(" "),b.contentClasses=[u.content.replace(c,d),e?u.content.replace(c,e):"",f].join(" "),b.$nav=this.addClass(b.navClasses),b.$handle=a(b.handle).addClass(b.handleClasses),b.$content=a(b.content).addClass(b.contentClasses),b.$animate=a().add(b.$nav).add(b.$content),p(b),b.$handle.attr("data-swap-target",b.dotGuid).attr("data-swap-linked","."+b.handleGuid).attr("data-swap-group",u.base).on("activate.swap"+b.dotGuid,b,j).on("deactivate.swap"+b.dotGuid,b,k).on("enable.swap"+b.dotGuid,b,l).on("disable.swap"+b.dotGuid,b,m).swap({maxWidth:b.maxWidth,classes:{target:b.dotGuid,enabled:t.enabled,active:t.open,raw:{target:b.rawGuid,enabled:u.enabled,active:u.open}}})}function e(a){a.$content.removeClass(a.contentClasses).off(v.namespace),a.$handle.removeAttr("data-swap-target").removeData("swap-target").removeAttr("data-swap-linked").removeData("swap-linked").removeClass(a.handleClasses).off(a.dotGuid).text(a.originalLabel).swap("destroy"),q(a),o(a),this.removeClass(a.navClasses).off(v.namespace)}function f(a){a.$handle.swap("activate")}function g(a){a.$handle.swap("deactivate")}function h(a){a.$handle.swap("enable")}function i(a){a.$handle.swap("disable")}function j(a){if(!a.originalEvent){var b=a.data;b.open||(b.$el.trigger(v.open),b.$content.addClass(u.open).one(v.clickTouchStart,function(){g(b)}),b.label&&b.$handle.text(b.labels.open),n(b),b.open=!0)}}function k(a){if(!a.originalEvent){var b=a.data;b.open&&(b.$el.trigger(v.close),b.$content.removeClass(u.open).off(v.namespace),b.label&&b.$handle.text(b.labels.closed),o(b),b.open=!1)}}function l(a){var b=a.data;b.$content.addClass(u.enabled),setTimeout(function(){b.$animate.addClass(u.animated)},0),b.label&&b.$handle.text(b.labels.closed)}function m(a){var b=a.data;b.$content.removeClass(u.enabled,u.animated),b.$animate.removeClass(u.animated),q(b),o(b)}function n(a){a.isToggle||w.addClass(u.lock)}function o(a){a.isToggle||w.removeClass(u.lock)}function p(a){if(a.label)if(a.$handle.length>1){a.originalLabel=[];for(var b=0,c=a.$handle.length;c>b;b++)a.originalLabel[b]=a.$handle.eq(b).text()}else a.originalLabel=a.$handle.text()}function q(a){if(a.label)if(a.$handle.length>1)for(var b=0,c=a.$handle.length;c>b;b++)a.$handle.eq(b).text(a.originalLabel[b]);else a.$handle.text(a.originalLabel)}var r=b.Plugin("navigation",{widget:!0,defaults:{customClass:"",gravity:"left",label:!0,labels:{closed:"Menu",open:"Close"},maxWidth:"980px",type:"toggle"},classes:["handle","nav","content","animated","enabled","open","toggle","push","reveal","overlay","left","right","lock"],events:{tap:"tap",open:"open",close:"close"},methods:{_setup:c,_construct:d,_destruct:e,open:f,close:g,enable:h,disable:i}}),s=r.namespace,t=r.classes,u=t.raw,v=r.events,w=(r.functions,null)}(jQuery,Formstone);
/*! formstone v0.6.9 [swap.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(b){b.enabled=!1,b.active=!1,b.classes=a.extend(!0,{},l,b.classes),b.target=this.data(k+"-target"),b.$target=a(b.target).addClass(b.classes.raw.target),b.linked=this.data(k+"-linked"),b.mq="(max-width:"+(b.maxWidth===1/0?"100000px":b.maxWidth)+")";var c=this.data(k+"-group");b.group=c?"[data-"+k+'-group="'+c+'"]':!1,!b.collapse&&b.group&&a(b.group).eq(0).attr("data-"+k+"-active","true"),b.onEnable=this.data(k+"-active"),b.$swaps=a().add(this).add(b.$target),this.touch({tap:!0}).on(m.tap+b.dotGuid,b,i),a.mediaquery("bind",b.rawGuid,b.mq,{enter:function(){g.call(b.$el,b)},leave:function(){h.call(b.$el,b)}})}function d(b){a.mediaquery("unbind",b.rawGuid),b.$swaps.removeClass([b.classes.raw.enabled,b.classes.raw.active].join(" ")).off(m.namespace),this.touch("destroy")}function e(b,c){if(b.enabled&&!b.active){a(b.group).not(b.$el)[j.namespace]("deactivate");var d=b.group?a(b.group).index(b.$el):null;b.$swaps.addClass(b.classes.raw.active),b.linked&&!c&&(a(b.linked).not(b.$el).swap("activate",!0),this.trigger(m.activate,[d])),b.active=!0}}function f(b,c){b.enabled&&b.active&&(b.$swaps.removeClass(b.classes.raw.active),b.linked&&!c&&(a(b.linked).not(b.$el).swap("deactivate",!0),this.trigger(m.deactivate)),b.active=!1)}function g(b,c){b.enabled||(b.enabled=!0,b.$swaps.addClass(b.classes.raw.enabled),c||a(b.linked).not(b.$el).swap("enable"),this.trigger(m.enable),b.onEnable?(b.active=!0,b.$swaps.addClass(b.classes.raw.active)):(b.active=!0,f.call(this,b)))}function h(b,c){b.enabled&&(b.enabled=!1,b.$swaps.removeClass([b.classes.raw.enabled,b.classes.raw.active].join(" ")),c||a(b.linked).not(b.$el).swap("disable"),this.trigger(m.disable))}function i(a){n.killEvent(a);var b=a.data;b.active&&b.collapse?f.call(b.$el,b):e.call(b.$el,b)}var j=b.Plugin("swap",{widget:!0,defaults:{collapse:!0,maxWidth:1/0},classes:["target","enabled","active"],events:{tap:"tap",activate:"activate",deactivate:"deactivate",enable:"enable",disable:"disable"},methods:{_construct:c,_destruct:d,activate:e,deactivate:f,enable:g,disable:h}}),k=j.namespace,l=j.classes,m=j.events,n=j.functions}(jQuery,Formstone);
/*! formstone v0.6.9 [touch.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(a){a.touches=[],a.touching=!1,this.on(r.dragStart,s.killEvent),a.tap?(a.pan=!1,a.scale=!1,a.swipe=!1,b.support.touch?this.on([r.touchStart,r.pointerDown].join(" "),a,f):this.on(r.click,a,k)):(a.pan||a.swipe||a.scale)&&(a.tap=!1,a.swipe&&(a.pan=!0),a.scale&&(a.axis=!1),a.axis?(a.axisX="x"===a.axis,a.axisY="y"===a.axis):o(this,"none"),this.on([r.touchStart,r.pointerDown].join(" "),a,e),a.pan&&!b.support.touch&&this.on(r.mouseDown,a,f))}function d(){this.off(r.namespace),o(this,"")}function e(a){a.preventManipulation&&a.preventManipulation();var b=a.data,c=a.originalEvent;if(c.type.match(/(up|end)$/i))return void j(a);if(c.pointerId){var d=!1;for(var e in b.touches)b.touches[e].id===c.pointerId&&(d=!0,b.touches[e].pageX=c.clientX,b.touches[e].pageY=c.clientY);d||b.touches.push({id:c.pointerId,pageX:c.clientX,pageY:c.clientY})}else b.touches=c.touches;c.type.match(/(down|start)$/i)?f(a):c.type.match(/move$/i)&&g(a)}function f(b){var c=b.data,d="undefined"!==a.type(c.touches)?c.touches[0]:null;if(c.touching||(c.startE=b.originalEvent,c.startX=d?d.pageX:b.pageX,c.startY=d?d.pageY:b.pageY,c.startT=(new Date).getTime(),c.scaleD=1,c.passed=!1),c.tap)c.clicked=!1,c.$el.on([r.touchMove,r.pointerMove].join(" "),c,e).on([r.touchEnd,r.touchCancel,r.pointerUp,r.pointerCancel].join(" "),c,e);else if(c.pan||c.scale){c.$links&&c.$links.off(r.click);var f=l(c.scale?r.scaleStart:r.panStart,b,c.startX,c.startY,c.scaleD,0,0,"","");if(c.scale&&c.touches&&c.touches.length>=2){var h=c.touches;c.pinch={startX:m(h[0].pageX,h[1].pageX),startY:m(h[0].pageY,h[1].pageY),startD:n(h[1].pageX-h[0].pageX,h[1].pageY-h[0].pageY)},f.pageX=c.startX=c.pinch.startX,f.pageY=c.startY=c.pinch.startY}c.touching||(c.touching=!0,c.pan&&t.on(r.mouseMove,c,g).on(r.mouseUp,c,j),t.on([r.touchMove,r.touchEnd,r.touchCancel,r.pointerMove,r.pointerUp,r.pointerCancel].join(" "),c,e),c.$el.trigger(f))}}function g(b){var c=b.data,d="undefined"!==a.type(c.touches)?c.touches[0]:null,e=d?d.pageX:b.pageX,f=d?d.pageY:b.pageY,g=e-c.startX,h=f-c.startY,i=g>0?"right":"left",k=h>0?"down":"up",o=Math.abs(g)>u,p=Math.abs(h)>u;if(c.tap)(o||p)&&c.$el.off([r.touchMove,r.touchEnd,r.touchCancel,r.pointerMove,r.pointerUp,r.pointerCancel].join(" "));else if(c.pan||c.scale)if(!c.passed&&c.axis&&(c.axisX&&p||c.axisY&&o))j(b);else{!c.passed&&(!c.axis||c.axis&&c.axisX&&o||c.axisY&&p)&&(c.passed=!0),c.passed&&(s.killEvent(b),s.killEvent(c.startE));var q=!0,t=l(c.scale?r.scale:r.pan,b,e,f,c.scaleD,g,h,i,k);if(c.scale)if(c.touches&&c.touches.length>=2){var v=c.touches;c.pinch.endX=m(v[0].pageX,v[1].pageX),c.pinch.endY=m(v[0].pageY,v[1].pageY),c.pinch.endD=n(v[1].pageX-v[0].pageX,v[1].pageY-v[0].pageY),c.scaleD=c.pinch.endD/c.pinch.startD,t.pageX=c.pinch.endX,t.pageY=c.pinch.endY,t.scale=c.scaleD,t.deltaX=c.pinch.endX-c.pinch.startX,t.deltaY=c.pinch.endY-c.pinch.startY}else c.pan||(q=!1);q&&c.$el.trigger(t)}}function h(b,c){b.on(r.click,c,i);var d=a._data(b[0],"events").click;d.unshift(d.pop())}function i(a){s.killEvent(a,!0),a.data.$links.off(r.click)}function j(b){var c=b.data;if(c.tap)c.$el.off([r.touchMove,r.touchEnd,r.touchCancel,r.pointerMove,r.pointerUp,r.pointerCancel,r.mouseMove,r.mouseUp].join(" ")),c.startE.preventDefault(),k(b);else if(c.pan||c.scale){var d="undefined"!==a.type(c.touches)?c.touches[0]:null,e=d?d.pageX:b.pageX,f=d?d.pageY:b.pageY,g=e-c.startX,i=f-c.startY,j=(new Date).getTime(),m=c.scale?r.scaleEnd:r.panEnd,n=g>0?"right":"left",o=i>0?"down":"up",p=Math.abs(g)>1,q=Math.abs(i)>1;if(c.swipe&&Math.abs(g)>u&&j-c.startT<v&&(m=r.swipe),c.axis&&(c.axisX&&q||c.axisY&&p)||p||q){c.$links=c.$el.find("a");for(var s=0,w=c.$links.length;w>s;s++)h(c.$links.eq(s),c)}var x=l(m,b,e,f,c.scaleD,g,i,n,o);t.off([r.touchMove,r.touchEnd,r.touchCancel,r.mouseMove,r.mouseUp,r.pointerMove,r.pointerUp,r.pointerCancel].join(" ")),c.$el.trigger(x),c.touches=[],c.scale}c.touching=!1}function k(a){s.killEvent(a);var b=a.data;if(!b.clicked){"click"!==a.type&&(b.clicked=!0);var c=b.startE?b.startX:a.pageX,d=b.startE?b.startY:a.pageY,e=l(r.tap,a.originalEvent,c,d,1,0,0);b.$el.trigger(e)}}function l(b,c,d,e,f,g,h,i,j){return a.Event(b,{originalEvent:c,bubbles:!0,pageX:d,pageY:e,scale:f,deltaX:g,deltaY:h,directionX:i,directionY:j})}function m(a,b){return(a+b)/2}function n(a,b){return Math.sqrt(a*a+b*b)}function o(a,b){a.css({"-ms-touch-action":b,"touch-action":b})}var p=!b.window.PointerEvent,q=b.Plugin("touch",{widget:!0,defaults:{axis:!1,pan:!1,scale:!1,swipe:!1,tap:!1},methods:{_construct:c,_destruct:d},events:{pointerDown:p?"MSPointerDown":"pointerdown",pointerUp:p?"MSPointerUp":"pointerup",pointerMove:p?"MSPointerMove":"pointermove",pointerCancel:p?"MSPointerCancel":"pointercancel"}}),r=q.events,s=q.functions,t=b.$window,u=10,v=50;r.tap="tap",r.pan="pan",r.panStart="panstart",r.panEnd="panend",r.scale="scale",r.scaleStart="scalestart",r.scaleEnd="scaleend",r.swipe="swipe"}(jQuery,Formstone);

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


});
