# Smooth Scroll
A simple script to animate scrolling to anchor links. Easing support contributed by [Willem Liu](https://github.com/willemliu) with code from [Gaëtan Renaudeau](https://gist.github.com/gre/1650294).

## How It Works
Getting started with Smooth Scroll is really easy. [View the online tutorial](http://cferdinandi.github.com/smooth-scroll/) or dig through the `index.html` file.

## Changelog
* v3.3 (February 19, 2014)
  * [Add `offsettTop` to `offsetHeigh`t for `scrollHeader`. Allows for multiple fixed headers, or a fixed header that sits slightly below the top of the page.](https://github.com/cferdinandi/smooth-scroll/pull/36)
* v3.2 (February 10, 2014)
  * [Fixes iOS infinite loop](https://github.com/cferdinandi/smooth-scroll/pull/35) and [Chrome browser zoom](https://github.com/cferdinandi/smooth-scroll/issues/31) bugs.
* v3.1 (February 4, 2014)
  * Reverted to `Array.protype.foreach` loops.
* v3.0 (January 28, 2014)
  * Switched to a data attribute for the toggle selector.
  * Added namespacing to IIFE.
  * Updated looping method and event listener.
* v2.19 (January 23, 2014)
  * [Fix back button behavior in Chrome.](https://github.com/cferdinandi/smooth-scroll/issues/26#issuecomment-33172325)
* v2.18 (January 23, 2014)
  * [Update URL before animation.](https://github.com/cferdinandi/smooth-scroll/pull/27)
  * [Fix back button behavior in Firefox.](https://github.com/cferdinandi/smooth-scroll/issues/26)
* v2.17 (January 17, 2014)
  * [Fixed back button behavior when using `data-url` feature.](https://github.com/cferdinandi/smooth-scroll/pull/18)
* v2.16 (January 16, 2014)
  * [Updated variables for more accurate easing math when scrolling to top of page.](https://github.com/cferdinandi/smooth-scroll/pull/25#issuecomment-32566729)
* v2.15 (January 16, 2014)
  * [Fixed bug that caused "scroll-to-top" animation to create endless loop.](https://github.com/cferdinandi/smooth-scroll/issues/24)
* v2.14 (January 15, 2014)
  * [Fixed bug that caused animation to stop several pixels short.](https://github.com/cferdinandi/smooth-scroll/pull/15#issuecomment-32380770)
* v2.12 (January 7, 2014)
  * [Added fixed header support.](https://github.com/cferdinandi/smooth-scroll/pull/20#issuecomment-31773547)
* v2.11 (January 4, 2014)
  * [Change `offsetHeight` to `scrollHeight` to fix fixed/absolute positioning issues.](https://github.com/cferdinandi/smooth-scroll/pull/14)
* v2.10 (December 31, 2013)
  * [Added URL history support.](https://github.com/cferdinandi/smooth-scroll/pull/17)
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