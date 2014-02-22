/* =============================================================

	Smooth Scroll v3.3
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
	var _easingPattern = function (type, time) {
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
	var _getEndLocation = function (anchor, headerHeight) {
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
	// Returns {object}
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
	// Private method
	var _runAnimateScroll = function ( startLocation, endLocation, duration, easing ) {

		// Selectors and variables
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
		var _animateScroll = function () {
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
			animationInterval = setInterval(_animateScroll, 16);
		};

		// Start scrolling animation
		_startAnimateScroll();

	};

	// Update the URL
	// Private method
	var _updateURL = function (url, anchor) {
		if ( (url === true || url === 'true') && history.pushState ) {
			history.pushState( {pos:anchor.id}, '', '#' + anchor.id );
		}
	};

	// Run the smooth scroll animation
	// Private method
	var _runSmoothScroll = function (anchor, duration, easing, url) {

		// Get the height of a fixed header if one exists
		var scrollHeader = document.querySelector('[data-scroll-header]');
		var headerHeight = scrollHeader === null ? 0 : (scrollHeader.offsetHeight + scrollHeader.offsetTop);

		// Get start and end locations
		var startLocation = window.pageYOffset;
		var endLocation = _getEndLocation(anchor, headerHeight);

		// Run animation and update URL
		_updateURL(url, anchor);
		_runAnimateScroll( startLocation, endLocation, duration, easing );

	};

	// Check that anchor exists and run scroll animation
	// Private method
	var _handleToggleClick = function (options, event) {

		// Selectors and variables
		var overrides = _getDataOptions( this.getAttribute('data-options') );
		var anchor = document.querySelector(this.getAttribute('href'));
		var speed = overrides.speed || options.speed || 500;
		var easing = overrides.easing || options.easing || 'easeInOutCubic';
		var updateURL = overrides.updateURL || options.updateURL || false;

		// If an anchor exists, run Smooth Scroll
		if ( anchor ) {
			event.preventDefault();
			// _runSmoothScroll( dataTarget, dataSpeed, dataEasing, dataURL );
			_runSmoothScroll( anchor, speed, easing, updateURL );
		}

	};

	// Initialize Smooth Scroll
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = options || {};
			var scrollToggle = options.scrollToggle || '[data-scroll]';
			var toggles = document.querySelectorAll(scrollToggle); // Get smooth scroll toggles

			// When a toggle is clicked, run the click handler
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', _handleToggleClick.bind( toggle, options ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);