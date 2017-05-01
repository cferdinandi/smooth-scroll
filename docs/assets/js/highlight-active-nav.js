/**
 * highlight-active-nav.js
 * @description  Highlight the active navigation element
 * @version      1.0.0
 * @author       Chris Ferdinandi
 * @license      MIT
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.highlightActiveNav = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var highlight = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings;

	// Default settings
	var defaults = {
		selector: '[data-nav-highlight]',
		activeClass: 'nav-active',
		urlPrefix: null,
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	highlight.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		settings = null;
		container = null;
	};

	/**
	 * Initialize highlightActiveNav
	 * @public
	 * @param {Object} options User settings
	 */
	highlight.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		highlight.destroy();

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Get the container
		var href = settings.urlPrefix ? location.pathname.split( settings.urlPrefix )[1] : location.pathname;
		var nav = document.querySelector( settings.selector + ' a[href^="' + href + '"]' );
		if ( !nav ) return;

		// Add class to active nav
		nav.className += ' ' + settings.activeClass;

		// Run callback
		settings.callback();

	};


	//
	// Public APIs
	//

	return highlight;

});