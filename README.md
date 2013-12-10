# Smooth Scroll
A simple script to animate scrolling to anchor links. Easing support contributed by [Willem Liu](https://github.com/willemliu) with code from [Gaëtan Renaudeau](https://gist.github.com/gre/1650294).

## How It Works
Getting started with Smooth Scroll is really easy. [View the online tutorial](http://cferdinandi.github.com/smooth-scroll/) or dig through the `index.html` file.

## Changelog
* v2.9 (December 9, 2013)
  * [Added fixed for infinite loop when scrolling up.](https://github.com/cferdinandi/smooth-scroll/issues/13)
* v2.8 (December 3, 2013)
  * [Fixed false distance reading.](https://github.com/cferdinandi/smooth-scroll/issues/11)
  * Added linear easing as fallback when easing pattern not recognized to prevent script from failing.
* v2.7 (November 25, 2013)
  * Converted naming conventions back to mathmatical roots (ex. `easeInCubic`) to remain consistent with development community language.
* v2.6 (November 26, 2013)
  * Missing character was causing certain easing functions to break.
* v2.5 (November 22, 2013)
  * Changed the default easing to `easeInOutNormal`.
* v2.4 (November 21, 2013)
  * Added easing support with contributions from [Willem Liu](https://github.com/willemliu) and code from [Gaëtan Renaudeau](https://gist.github.com/gre/1650294).
* v2.3 (August 27, 2013)
  * Added missing semicolons.
  * Defined `animationStop` variable once, add values later.
  * Activated strict mode.
  * Wrapped in IIFE.
* v2.2 (August 17, 2013)
  * Now you can set the animation speed with the `data-speed` attribute. (ex. `data-speed="400"`)
* v2.1 (August 17, 2013)
  * Improvement animation function interval for smoother animation.
  * Updated to allow for scrolling up the page.
* v2.0 (August 14, 2013)
  * Converted to vanilla JavaScript.
  * Removed dependency on jQuery.
* v1.1 (June 7, 2013)
  * Switched to MIT license.
* v1.1 (May 18, 2013)
  * Added jQuery noConflict mode.
  * Updated tutorial.
* v1.0 (January 24, 2013)
  * Initial release.

## License
Smooth Scroll is free to use under the [MIT License](http://gomakethings.com/mit/).