/* =============================================================

	Smooth Scroll 2.5
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Easing support contributed by Willem Liu.
	https://github.com/willemliu

	Easing functions forked from Gaëtan Renaudeau.
	https://gist.github.com/gre/1650294

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to animate the scroll
		var smoothScroll = function (anchor, duration, easing) {

			// Calculate how far and how fast to scroll
			var startLocation = window.pageYOffset;
			var endLocation = anchor.offsetTop;
			var distance = endLocation - startLocation;
			var increments = distance / (duration / 16);
			var timeLapsed = 0;
			var percentage, position, stopAnimation;

			// Functions to control easing
			var easingPattern = function (type, timing) {
				if ( type == 'linear' ) return timing; // no easing, no acceleration
				if ( type == 'easeInGentle' ) return timing * timing; // accelerating from zero velocity
				if ( type == 'easeOutGentle' ) return timing * (2 - timing); // decelerating to zero velocity
				if ( type == 'easeInOutGentle' ) return timing < 0.5 ? 2 * timing * timing : -1 + (4 - 2 * timing) * timing; // acceleration until halfway, then deceleration
				if ( type == 'easeInNormal' ) return timing * timing * timing; // accelerating from zero velocity
				if ( type == 'easeOutNormal' ) return (--timing) * timing * timing + 1; // decelerating to zero velocity
				if ( type == 'easeInOutNormal' ) return timing < 0.5 ? 4 * timing * timing * timing : (timing - 1) * (2 * timing - 2) * (2 * timing - 2) + 1; // acceleration until halfway, then deceleration
				if ( type == 'easeInIntense' ) return timing * timing * timing * timing; // accelerating from zero velocity
				if ( type == 'easeOutInense' ) return 1 - (--timing) * timing * timing * timing; // decelerating to zero velocity
				if ( type == 'easeInOutIntense' ) return timing < 0.5 ? 8 * timing * timing * timing * timing : 1 - 8 * (--timing) * timing * timing * timing; // acceleration until halfway, then deceleration
				if ( type == 'easeInExtreme' ) return timing * timing * timing * timing * timing; // accelerating from zero velocity
				if ( type == 'easeOutExtreme' ) return 1 + (--timing) * timing * timing * timing * timing; // decelerating to zero velocity
				if ( type == 'easeInOutExtreme' ) return timing < 0.5 ? 16 * timing * timing * timing * timing * timing : 1 + 16 * (--timing) * timing * timing * timing * timing; // acceleration until halfway, then deceleration
			};

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / duration );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * easingPattern(easing, percentage) );
				window.scrollTo(0, position);
				stopAnimation();
			};

			// Stop the animation
			if ( increments >= 0 ) { // If scrolling down
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
						clearInterval(runAnimation);
					}
				};
			} else { // If scrolling up
				// Stop animation when you reach the anchor OR the top of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( travelled <= (endLocation || 0) ) {
						clearInterval(runAnimation);
					}
				};
			}

			// Loop the animation function
			var runAnimation = setInterval(animateScroll, 16);

		};

		// For each smooth scroll link
		var scrollToggle = document.querySelectorAll('.scroll');
		[].forEach.call(scrollToggle, function (toggle) {

			// When the smooth scroll link is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the default link behavior
				e.preventDefault();

				// Get anchor link and calculate distance from the top
				var dataID = toggle.getAttribute('href');
				var dataTarget = document.querySelector(dataID);
				var dataSpeed = toggle.getAttribute('data-speed');
				var dataEasing = toggle.getAttribute('data-easing'); // WL: Added easing attribute support.

				// If the anchor exists
				if (dataTarget) {
					// Scroll to the anchor
					smoothScroll(dataTarget, dataSpeed || 500, dataEasing || 'easeInOutNormal');
				}

			}, false);

		});

	}

})();