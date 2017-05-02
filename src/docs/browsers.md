# Browser Compatibility

## Supported Browsers

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would.

<hr>


## Known Issues

### `<body>` styling

If the `<body>` element has been assigned a height of `100%` or `overflow: hidden`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`, and an `overflow` of `visible`.

### Animating from the bottom

Animated scrolling links at the very bottom of the page (example: a "scroll to top" link) will stop animated almost immediately after they start when using certain easing patterns. This is an issue that's been around for a while and I've yet to find a good fix for it. I've found that `easeOut*` easing patterns work as expected, but other patterns can cause issues. [See this discussion for more details.](https://github.com/cferdinandi/smooth-scroll/issues/49)