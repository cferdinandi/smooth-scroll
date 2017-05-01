/**
 * tableOfContents.js
 * @description  Dynamically create a table of contents
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
		root.tableOfContents = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var toc = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, container;

	// Default settings
	var defaults = {
		container: '[data-toc]',
		selectors: '[data-toc-content] h2',
		heading: 'Contents',
		headingType: 'h2',
		headingClass: '',
		navClass: '',
		linkClass: '',
		initClass: 'js-table-of-contents',
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

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
	 * Render the Table of Contents
	 */
	toc.render = function () {

		// Variables
		var sections = document.querySelectorAll( settings.selectors );
		var toc = '';

		if ( sections.length === 0 ) return;

		// Loop through each section and create a link to it
		forEach(sections, function (section) {

			// Ignore sections without an id
			var id = section.id;
			if ( !id ) return;

			// Create section navigation
			toc += '<li><a class="' + settings.linkClass + '" href="#' + id + '">' + section.innerHTML + '</a></li>';

		});

		// Inject table of contents into the DOM
		container.innerHTML = '<' + settings.headingType + '>' + settings.heading + '</' + settings.headingType + '><ul class="' + settings.navClass + '">' + toc + '</ul>';

		// Run callback
		settings.callback();

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	toc.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		container.innerHTML = '';
		settings = null;
		container = null;
	};

	/**
	 * Initialize tableOfContents
	 * @public
	 * @param {Object} options User settings
	 */
	toc.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		toc.destroy();

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Get the container
		container = document.querySelector( settings.container );
		if ( !container ) return;

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Render the table of contents
		toc.render();

	};


	//
	// Public APIs
	//

	return toc;

});