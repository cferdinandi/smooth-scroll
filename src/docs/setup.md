# Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.


## 1. Include Smooth Scroll on your site.

```markup
<script src="dist/js/smooth-scroll.js"></script>
```

## 2. Add the markup to your HTML.

Turn anchor links into Smooth Scroll links by adding the `[data-scroll]` data attribute. Give the anchor location an ID just like you normally would.

```markup
<a data-scroll href="#bazinga">Anchor Link</a>
...
<span id="bazinga">Bazinga!</span>
```

## 3. Initialize Smooth Scroll.

In the footer of your page, after the content, initialize Smooth Scroll. And that's it, you're done. Nice work!

```markup
<script>
	smoothScroll.init();
</script>
```