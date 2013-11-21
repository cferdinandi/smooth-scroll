/* =============================================================

  Smooth Scroll 2.3
  Animate scrolling to anchor links, by Chris Ferdinandi.
  http://gomakethings.com

  21-11-2013 Willem Liu (WL): Added support for easing 
                              (https://gist.github.com/gre/1650294).
                              Defaults to linear. Toned down
                              animation interval to 20ms.
  
  Free to use under the MIT License.
  http://gomakethings.com/mit/

 * ============================================================= */

 (function() {

  'use strict';

  // Feature Test
  if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

    // Function to animate the scroll
    var smoothScroll = function (anchor, duration, easing='linear') {

      // Calculate how far and how fast to scroll
      var interval = 20; // WL: set update interval
      var startLocation = window.pageYOffset;
      var endLocation = anchor.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance/(duration/interval);
      var timeLapsed = 0; // WL: for easing
      var stopAnimation;

      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function () {
        // WL: Added easing to animation. Easing makes use of EasingFunctions functions array.
        if(easing != 'linear' && typeof(EasingFunctions) != 'undefined' && EasingFunctions[easing] != null) {
          timeLapsed += interval;
          var percentage = (timeLapsed / duration);
          percentage = (percentage>1)?1:percentage;
          var pos = startLocation+((distance)*EasingFunctions[easing](percentage));
          window.scrollTo(0, pos);
        }
        else {
          window.scrollBy(0, increments);
        }
        stopAnimation();
      };

      // If scrolling down
      if ( increments >= 0 ) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function () {
          var travelled = window.pageYOffset;
          if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
            clearInterval(runAnimation);
          }
        };
      }
      // If scrolling up
      else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function () {
          var travelled = window.pageYOffset;
          if ( travelled <= (endLocation || 0) ) {
            clearInterval(runAnimation);
          }
        };
      }

      // Loop the animation function
      var runAnimation = setInterval(animateScroll, interval);

    };

    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('.scroll');

    // For each smooth scroll link
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
          smoothScroll(dataTarget, dataSpeed || 500, dataEasing || 'linear');
        }

      }, false);

    });

  }

 })();
