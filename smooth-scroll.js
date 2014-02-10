/* =============================================================

	Smooth Scroll 3.2
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

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		var scrollToggles = document.querySelectorAll('[data-scroll]');


		// METHODS

		// Run the smooth scroll animation
		var runSmoothScroll = function (anchor, duration, easing, url) {

			// SELECTORS

			var startLocation = window.pageYOffset;

			// Get the height of a fixed header if one exists
			var scrollHeader = document.querySelector('[data-scroll-header]');
			var headerHeight = scrollHeader === null ? 0 : scrollHeader.offsetHeight;

			// Set the animation variables to 0/undefined.
			var timeLapsed = 0;
			var percentage, position;


			// METHODS

			// Calculate the easing pattern
			var easingPattern = function (type, time) {
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

			// Update the URL
			var updateURL = function (url, anchor) {
				if ( url === 'true' && history.pushState ) {
					history.pushState( {pos:anchor.id}, '', '#' + anchor.id );
				}
			};

			// Calculate how far to scroll
			var getEndLocation = function (anchor) {
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
			var endLocation = getEndLocation(anchor);
			var distance = endLocation - startLocation;

			// Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
			var stopAnimation = function () {
				var currentLocation = window.pageYOffset;
				if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
					clearInterval(runAnimation);
				}
			};

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / duration );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(easing, percentage) );
				window.scrollTo( 0, position );
				stopAnimation();
			};


			// EVENTS, LISTENERS, AND INITS

			updateURL(url, anchor);
			var runAnimation = setInterval(animateScroll, 16);

		};

		// Check that anchor exists and run scroll animation
		var handleToggleClick = function (event) {

			// SELECTORS

			// Get anchor link and calculate distance from the top
			var dataID = this.getAttribute('href');
			var dataTarget = document.querySelector(dataID);
			var dataSpeed = this.getAttribute('data-speed');
			var dataEasing = this.getAttribute('data-easing');
			var dataURL = this.getAttribute('data-url');


			// EVENTS, LISTENERS, AND INITS

			event.preventDefault();
			if (dataTarget) {
				runSmoothScroll( dataTarget, dataSpeed || 500, dataEasing || 'easeInOutCubic', dataURL || 'false' );
			}

		};


		// EVENTS, LISTENERS, AND INITS

		// When a toggle is clicked, run the click handler
		Array.prototype.forEach.call(scrollToggles, function (toggle, index) {
			toggle.addEventListener('click', handleToggleClick, false);
		});

		// Return to the top of the page when back button is clicked and no hash is set
		window.onpopstate = function (event) {
			if ( event.state === null && window.location.hash === '' ) {
				window.scrollTo( 0, 0 );
			}
		};

	}

})(window, document);