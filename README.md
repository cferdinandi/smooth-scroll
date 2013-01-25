# SmoothScroll.js
A simple jQuery script to animate scrolling to anchor links. Script by [Charlie Evans](http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links).

## How It Works
1. Include the `smooth-scroll.js` file on your site.
2. Add the `.scroll` class to your anchor links.
3. Give the anchor location an ID just like your normally would.

For browsers that don't support JavaScript, anchor links work as they normally would. For supporting browsers, they'll get an animated scroll.

    <a class="scroll" href="#bazinga">Anchor Link</a>
    ...

    <h3 id="bazinga">Bazinga!</h3>
    ...

    <script src="smooth-scroll.js"></script>

## Changelog
* 1/24/2013
  * Initial release.

## License
SmoothScroll.js is licensed under [WTFPL](http://www.wtfpl.net/).
