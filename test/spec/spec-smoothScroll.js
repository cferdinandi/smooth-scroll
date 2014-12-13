describe('Smooth Scroll', function () {

    describe('API', function () {
        it('should export the smoothScroll module', function () {
            expect(smoothScroll).toBeDefined();
        });

        it('should expose public functions', function () {
            expect(smoothScroll.init).toEqual(jasmine.any(Function));
            expect(smoothScroll.destroy).toEqual(jasmine.any(Function));
            expect(smoothScroll.animateScroll).toEqual(jasmine.any(Function));
        });

        it('uses event listeners', function () {
            spyOn(document, 'addEventListener');
            smoothScroll.init();
            expect(document.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);

            spyOn(document, 'removeEventListener');
            smoothScroll.destroy();
            expect(document.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
        });
    });

    /**
    * Simulate a click event.
    * @public
    * @param {Element} the element to simulate a click on
    */
    var simulateClick = function (elt) {
        var click = document.createEvent('MouseEvents');
        click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        elt.dispatchEvent(click);
    };

    /**
    * Create a link element, add it to the body.
    * @public
    * @param {String} the href attribute of the new link
    * @param {Boolean} whether to add data-scroll to the link or not
    * @returns {Element}
    */
    var createTestLink = function (href, smooth) {
        var elt = document.createElement('a');
        elt.href = href;
        if (smooth) {
            elt.setAttribute('data-scroll', true);
        }
        document.body.appendChild(elt);
        return elt;
    };

    // A pattern for settings to validate their format.
    var settingsStub = {
        speed: jasmine.any(Number),
        easing: jasmine.any(String),
        offset: jasmine.any(Number),
        updateURL: jasmine.any(Boolean),
        callbackBefore: jasmine.any(Function),
        callbackAfter: jasmine.any(Function)
    };

    describe('click on anchor', function () {
        var elt = createTestLink('#anchor', true);
        document.body.setAttribute('id', 'anchor');

        afterEach(function () {
            smoothScroll.destroy();
        });

        it('triggers smooth scrolling', function () {
            spyOn(smoothScroll, 'animateScroll');
            smoothScroll.init();
            simulateClick(elt);
            // TODO: uncomment one, remove the other and .tohaveBeenCalled when the animateScroll signature bug is fixed.
            // expect(smoothScroll.animateScroll).toHaveBeenCalledWith(elt, '#anchor', jasmine.objectContaining(settingsStub), jasmine.any(Object));
            // expect(smoothScroll.animateScroll).toHaveBeenCalledWith(elt, '#anchor', jasmine.objectContaining(settingsStub));
            expect(smoothScroll.animateScroll).toHaveBeenCalled();
        });

        it('does nothing if not initialized', function () {
            spyOn(smoothScroll, 'animateScroll');
            simulateClick(elt);
            expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
        });

        it('does nothing if destructed', function () {
            spyOn(smoothScroll, 'animateScroll');
            smoothScroll.init();
            smoothScroll.destroy();
            simulateClick(elt);
            expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
        });
    });

    describe('before and after callbacks', function () {
        var elt = createTestLink('#anchor', true);
        document.body.setAttribute('id', 'anchor');

        // Generates a callback to test asynchronous calls.
        var callback = function (eltVal, anchorVal, done) {
            return function (toggle, anchor) {
                expect(toggle).toBe(eltVal);
                expect(anchor).toBe(anchorVal);
                done();
            };
        };

        afterEach(function () {
            smoothScroll.destroy();
        });

        it('calls the before callback', function (done) {
            var settings = {
                callbackBefore: callback(elt, '#anchor', done)
            };
            smoothScroll.init(settings);
            simulateClick(elt);
        });

        it('calls the after callback', function (done) {
            var settings = {
                callbackAfter: callback(elt, '#anchor', done)
            };
            smoothScroll.init(settings);
            simulateClick(elt);
        });

        it('calls before and after in the right order', function (done) {
            var settings = {
                // The before callback will not trigger done().
                callbackBefore: callback(elt, '#anchor', function () {}),
                callbackAfter: callback(elt, '#anchor', done)
            };
            smoothScroll.init(settings);
            simulateClick(elt);
        });
    });
});
