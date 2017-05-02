# Extras

Frequently asked questions, code snippets, and more to help you get the most out of Smooth Scroll.

<hr>

## Scrolling to an anchor link on another page

This, unfortunately, cannot be done well.

Most browsers instantly jump you to the anchor location when you load a page. You could use `scrollTo(0, 0)` to pull users back up to the top, and then manually use the `smoothScroll.animateScroll()` method, but in my experience, it results in a visible jump on the page that's a worse experience than the default browser behavior.

<hr>

## Scrolling without updating the URL

Smooth Scroll is designed to progressively enhance anchor links while offloading as much to the browser as possible. In it's current implementation, it relies on `hashchange` events (which occur whenever a `#` changes in the URL) to trigger the scrolling behavior.

A benefit of this approach is that it preserves browser history and let's users navigate between anchors with the forward and back buttons on the browsers, just like you would normally.

*However*, I know certain front-end frameworks also use URL hashes for their own internal processes. While I view this as an anti-pattern, and won't bake hashless anchor links into Smooth Scroll's core, you can enable scrolling without updating the URL via the Smooth Scroll API.

Here's a relatively lightweight helper function that listens for click events and uses the `smoothScroll.animateScroll()` method to scroll to the anchor. If you use this, you **should not** need initialize Smooth Scroll with `smoothScroll.init()`.

```javascript
var smoothScrollWithoutHash = function (selector, settings) {

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};


	/**
	 * If smooth scroll element clicked, animate scroll
	 * @private
	 */
	var clickHandler = function (event) {
		var toggle = getClosest( event.target, selector );
		console.log(toggle);
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		console.log(toggle.hash);
		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		smoothScroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );

};

// Run our function
smoothScrollWithoutHash( 'a[href*="#"]' );
```