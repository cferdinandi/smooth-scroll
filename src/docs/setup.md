# Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

<hr>

## Quick Start

### 1. Include Smooth Scroll on your site.

```markup
<script src="dist/js/smooth-scroll.js"></script>
```

### 2. Add the markup to your HTML.

Turn anchor links into Smooth Scroll links by adding the `[data-scroll]` data attribute. Give the anchor location an ID just like you normally would.

```markup
<a data-scroll href="#bazinga">Anchor Link</a>
...
<span id="bazinga">Bazinga!</span>
```

### 3. Initialize Smooth Scroll.

In the footer of your page, after the content, initialize Smooth Scroll. And that's it, you're done. Nice work!

```markup
<script>
	smoothScroll.init();
</script>
```

<hr>

## Using a Package Manager

Install Smooth Scroll with your favorite package manager or module bundler directly from NPM.

```bash
npm install smooth-scroll
```

<hr>


## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Using Gulp

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made and applies changes using [LiveReload](http://livereload.com/).

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.