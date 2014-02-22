/* =============================================================

	Smooth Scroll v4.0
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Easing support contributed by Willem Liu.
	https://github.com/willemliu

	Easing functions forked from Gaëtan Renaudeau.
	https://gist.github.com/gre/1650294

	URL history support contributed by Robert Pate.
	https://github.com/robertpateii

	Fixed header support contributed by Arndt von Lucadou.
	https://github.com/a-v-l

	Infinite loop bugs in iOS and Chrome (when zoomed) by Alex Guzman.
	https://github.com/alexguzman

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.smoothScroll = (function (window, document, undefined) {

	'use strict';

	// Calculate the easing pattern
	// Private method
	// Returns a decimal number
	var _easingPattern = function ( type, time ) {
		if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
		if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
		if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
		return time; // no easing, no acceleration
	};

	// Calculate how far to scroll
	// Private method
	// Returns an integer
	var _getEndLocation = function ( anchor, headerHeight ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = location - headerHeight;
		if ( location >= 0 ) {
			return location;
		} else {
			return 0;
		}
	};

	// Convert data-options attribute into an object of key/value pairs
	// Private method
	// Returns an {object}
	var _getDataOptions = function ( options ) {

		if ( options === null || options === undefined  ) {
			return {};
		} else {
			var settings = {}; // Create settings object
			options = options.split(';'); // Split into array of options

			// Create a key/value pair for each setting
			options.forEach( function(option) {
				option = option.trim();
				if ( option !== '' ) {
					option = option.split(':');
					settings[option[0]] = option[1].trim();
				}
			});

			return settings;
		}

	};

	// Start/stop the scrolling animation
	// Public method
	// Runs functions
	var animateScroll = function ( anchor, duration, easing, fixedHeader ) {

		// Selectors and variables
		fixedHeader = document.querySelector(fixedHeader); // Get the fixed header
		var headerHeight = fixedHeader === null ? 0 : (fixedHeader.offsetHeight + fixedHeader.offsetTop); // Get the height of a fixed header if one exists
		var startLocation = window.pageYOffset; // Current location on the page
		var endLocation = _getEndLocation(anchor, headerHeight); // Scroll to location
		var animationInterval; // interval timer
		var distance = endLocation - startLocation; // distance to travel
		var timeLapsed = 0;
		var percentage, position;

		// Stop the scroll animation when it reaches its target (or the bottom/top of page)
		// Private method
		var _stopAnimateScroll = function () {
			var currentLocation = window.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
				clearInterval(animationInterval);
			}
		};

		// Loop scrolling animation
		// Private method
		var _loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / duration );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * _easingPattern(easing, percentage) );
			window.scrollTo( 0, position );
			_stopAnimateScroll(position, endLocation, animationInterval);
		};

		// Set interval timer
		// Private method
		var _startAnimateScroll = function () {
			animationInterval = setInterval(_loopAnimateScroll, 16);
		};

		// Start scrolling animation
		_startAnimateScroll();

	};

	// Update the URL
	// Private method
	// Runs functions
	var _updateURL = function ( anchor, url ) {
		if ( (url === true || url === 'true') && history.pushState ) {
			history.pushState( {pos:anchor.id}, '', '#' + anchor.id );
		}
	};

	// Run smooth scroll on a clicked link
	// Private method
	var _runSmoothScroll = function ( options, event ) {

		// Selectors and variables
		var overrides = _getDataOptions( this.getAttribute('data-options') );
		var anchor = document.querySelector(this.getAttribute('href'));
		var fixedHeader = options.fixedHeader || '[data-scroll-header]';
		var speed = overrides.speed || options.speed || 500;
		var easing = overrides.easing || options.easing || 'easeInOutCubic';
		var updateURL = overrides.updateURL || options.updateURL || false;

		// If an anchor exists, update URL and animate scroll
		if ( anchor ) {
			event.preventDefault();
			_updateURL(anchor, updateURL);
			animateScroll( anchor, speed, easing, fixedHeader );
		}

	};

	// Initialize Smooth Scroll
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = options || {};
			var scrollToggle = options.scrollToggle || '[data-scroll]';
			var toggles = document.querySelectorAll(scrollToggle); // Get smooth scroll toggles

			// When a toggle is clicked, run the click handler
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', _runSmoothScroll.bind( toggle, options ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		animateScroll: animateScroll
	};

})(window, document);