# Options and Settings

Smooth Scroll includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

<hr>

## Global Settings

You can pass options and callbacks into Smooth Scroll through the `init()` function:

```javascript
smoothScroll.init({
	selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
	selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	easing: 'easeInOutCubic', // Easing pattern to use
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	before: function (anchor, toggle) {}, // Function to run before scrolling starts
	after: function (anchor, toggle) {} // Function to run after scrolling completes
});
```

***Note:*** *To programatically add Smooth Scroll to all anchor links on a page, pass `selector: 'a[href*="#"]'` into `init`.*

### Easing Options

**Linear**
*Moves at the same speed from start to finish.*

* `Linear`


**Ease-In**
*Gradually increases in speed.*

* `easeInQuad`
* `easeInCubic`
* `easeInQuart`
* `easeInQuint`


**Ease-In-Out**
*Gradually increases in speed, peaks, and then gradually slows down.*

* `easeInOutQuad`
* `easeInOutCubic`
* `easeInOutQuart`
* `easeInOutQuint`


**Ease-Out**
*Gradually decreases in speed.*

* `easeOutQuad`
* `easeOutCubic`
* `easeOutQuart`
* `easeOutQuint`


Learn more about the different easing patterns and what they do at [easings.net](http://easings.net/).

<hr>


## Override settings with data attributes

Smooth Scroll also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute.

```markup
<a data-scroll
   data-options='{
					"speed": 500,
					"easing": "easeInOutCubic",
					"offset": 0
				}'
>
	Anchor Link
</a>
```

***Note:*** *You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work. Does not support the `callback` method.*

<hr>


## Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's scroll animation events in your own scripts.

### animateScroll()
Animate scrolling to an anchor.

```javascript
smoothScroll.animateScroll(
	anchor, // Node to scroll to. ex. document.querySelector( '#bazinga' )
	toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector( '#toggle' )
	options // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example 1**

```javascript
var anchor = document.querySelector( '#bazinga' );
smoothScroll.animateScroll( anchor );
```

**Example 2**

```javascript
var anchor = document.querySelector( '#bazinga' );
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
smoothScroll.animateScroll( anchor, toggle, options );
```

**Example 3**

```javascript
// You can optionally pass in a y-position to scroll to as an integer
smoothScroll.animateScroll( 750 );
```

### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
smoothScroll.destroy();
```

<hr>


## Fixed Headers

If you're using a fixed header, Smooth Scroll will automatically offset scroll distances by the header height. Pass in a valid CSS selector for your fixed header as an option to the `init`.

If you have multiple fixed headers, pass in the last one in the markup.

```markup
<nav data-scroll-header>
	...
</nav>
...
<script>
	smoothScroll.init({
		selectorHeader: '[data-scroll-header]'
	});
</script>
```

<hr>


## Animating links to other pages

This is an often requested feature, but Smooth Scroll does not include an option to animate scrolling to links on other pages.

You can attempt to implement it using the API, but it's very difficult to prevent the automatic browser jump when the page loads, and anything I've done to work around it results in weird, janky issues, so I've decided to leave this out of the core. Here's a potential workaround...

1. Do *not* add the `data-scroll` attribute to links to other pages. Treat them like normal links, and include your anchor link hash as normal.

    ```markup
    <a href="some-page.html#example">
    ```
2. Add the following script to the footer of your page, after the `smoothScroll.init()` function.

    ```markup
    <script>
        if ( window.location.hash ) {
        	var anchor = document.querySelector( window.location.hash ); // Get the anchor
        	var toggle = document.querySelector( 'a[href*="' + window.location.hash + '"]' ); // Get the toggle (if one exists)
            var options = {}; // Any custom options you want to use would go here
            smoothScroll.animateScroll( anchor, toggle, options );
        }
    </script>
    ```