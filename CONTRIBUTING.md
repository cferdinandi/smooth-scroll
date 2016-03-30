# How to contribute

I'm delighted that you're helping make this open source project better. Here are a few quick guidelines to make this an easier and better process for everyone.



## Reporting a bug

First, **make sure the bug hasn't already been reported** by searching GitHub's issues section.

If no existing issue exists, go ahead and create one. **Please be sure to include all of the following:**

1. A clear, descriptive title (ie. "A bug" is *not* a good title).
2. [A reduced test case.](https://css-tricks.com/reduced-test-cases/) In order to debug code issues, I need to see actual code in a browser.
3. The browser and OS that you're using.



## Asking a question

Before asking, please **make sure the question hasn't already been asked** by searching GitHub's issues section.



## Submitting a Pull Request

Please make sure your code meets the following code standards:

- Camel case for JavaScript variables.
- [Object-Oriented CSS](http://www.slideshare.net/stubbornella/object-oriented-css) for CSS selectors.
- Favor readable code over brevity. The build process will reduce size, so opt for readability. (ex. `var navigation` is better than `var n`)
- Order CSS properties alphabetically.
- Hard tabs.

Before submitting, make sure that you've:

- Updated the version number using semantic versioning.
- Made your changes in the `src` folder.
- Run the Gulp build to compile, minify, and update version numbers into the `dist` folder. If you cannot do this, please note this in the Pull Request.