/* =============================================================

	Smooth Scroll v4.5
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Additional contributors:
	https://github.com/cferdinandi/smooth-scroll#contributors

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.smoothScroll = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private {object} variable
	var _defaults = {
		speed: 500,
		easing: 'easeInOutCubic',
		offset: 0,
		updateURL: false,
		callbackBefore: function () {},
		callbackAfter: function () {}
	};
	
	// Options used for initialization
	var _lastOptions = {};
	
	// Index of next bound link (used for keeping track of click listeners)
	var _linkCounter = 0;
	
	// array of all attached click listeners, by link index
	var _linkClickListeners = [];

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

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
	var _getEndLocation = function ( anchor, headerHeight, offset ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = location - headerHeight - offset;
		if ( location >= 0 ) {
			return location;
		} else {
			return 0;
		}
	};

	// Determine the document's height
	// Private method
	// Returns an integer
	var _getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
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

	// Update the URL
	// Private method
	// Runs functions
	var _updateURL = function ( anchor, url ) {
		if ( (url === true || url === 'true') && history.pushState ) {
			history.pushState( {pos:anchor.id}, '', anchor );
		}
	};

	// Start/stop the scrolling animation
	// Public method
	// Runs functions
	var animateScroll = function ( toggle, anchor, options, event ) {

		// Options and overrides
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
		var speed = parseInt(overrides.speed || options.speed, 10);
		var easing = overrides.easing || options.easing;
		var offset = parseInt(overrides.offset || options.offset, 10);
		var updateURL = overrides.updateURL || options.updateURL;

		// Selectors and variables
		var fixedHeader = document.querySelector('[data-scroll-header]'); // Get the fixed header
		var headerHeight = fixedHeader === null ? 0 : (fixedHeader.offsetHeight + fixedHeader.offsetTop); // Get the height of a fixed header if one exists
		var startLocation = window.pageYOffset; // Current location on the page
		var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight, offset ); // Scroll to location
		var animationInterval; // interval timer
		var distance = endLocation - startLocation; // distance to travel
		var documentHeight = _getDocumentHeight();
		var timeLapsed = 0;
		var percentage, position;

		// Prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		// Update URL
		_updateURL(anchor, updateURL);

		// Stop the scroll animation when it reaches its target (or the bottom/top of page)
		// Private method
		// Runs functions
		var _stopAnimateScroll = function (position, endLocation, animationInterval) {
			var currentLocation = window.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= documentHeight ) ) {
				clearInterval(animationInterval);
				options.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
			}
		};

		// Loop scrolling animation
		// Private method
		// Runs functions
		var _loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / speed );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * _easingPattern(easing, percentage) );
			window.scrollTo( 0, Math.floor(position) );
			_stopAnimateScroll(position, endLocation, animationInterval);
		};

		// Set interval timer
		// Private method
		// Runs functions
		var _startAnimateScroll = function () {
			options.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
			animationInterval = setInterval(_loopAnimateScroll, 16);
		};

		// Reset position to fix weird iOS bug
		// https://github.com/cferdinandi/smooth-scroll/issues/45
		if ( window.pageYOffset === 0 ) {
			window.scrollTo( 0, 0 );
		}

		// Start scrolling animation
		_startAnimateScroll();

	};

	// Initialize Smooth Scroll
	// Public method
	// Runs functions
	var init = function ( options ) {
		
		// call reinit with the provided values
		reinit(options);
	};
	
	// Reassign the click handlers (for newly added links);
	// If no options are provided, the last used options (default options) will be used.
	// Public method
	var reinit = function ( options ) {
		
		options = options || _lastOptions || {}; // if no options, use last options; if no last options, use empty object
		
		_lastOptions = _mergeObjects( _defaults, options); // Merge user options with defaults
		
		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			var toggles = document.querySelectorAll('[data-scroll]'); // Get smooth scroll toggles

			// Go through all toggles and attach click handlers
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				
				var index;
				// If toggle has index, remove assigned listener;
				// otherwise give it an index
				if ( toggle.hasAttributeNS('smooth-scroll', 'index') ) {
					
					index = toggle.getAttributeNS('smooth-scroll', 'index');
					toggle.removeEventListener('click', _linkClickListeners[index], false);
				} else {
					
					index = _linkCounter++;
					toggle.setAttributeNS('smooth-scroll', 'index', index);
				}
				
				// prepare a listener
				var listener = animateScroll.bind( null, toggle, toggle.getAttribute('href'), _lastOptions );
				
				// remember listener for this toggle (using index)
				_linkClickListeners[index] = listener;		
				
				// add the listener
				toggle.addEventListener('click', listener, false);
			});
		}
	};

	// Return public methods
	return {
		init: init,
		reinit: reinit,
		animateScroll: animateScroll
	};

})(window, document);
