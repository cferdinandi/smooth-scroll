describe('Smooth Scroll', function () {

	//
	// Helper Methods
	//

	/**
	* Create a link element, add it to the body.
	* @public
	* @param {String} the href attribute of the new link
	* @param {Boolean} whether to add data-scroll to the link or not
	* @returns {Element}
	*/
	var injectElem = function (href, smooth) {
		var elt = document.createElement('a');
		elt.href = href;
		if (smooth) {
			elt.setAttribute('data-scroll', true);
		}
		document.body.appendChild(elt);
		return elt;
	};

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

	// A pattern for settings to validate their format.
	var settingsStub = {
		speed: jasmine.any(Number),
		easing: jasmine.any(String),
		offset: jasmine.any(Number),
		updateURL: jasmine.any(Boolean),
		callbackBefore: jasmine.any(Function),
		callbackAfter: jasmine.any(Function)
	};


	//
	// Init
	//

	describe('Should initialize plugin', function () {
		it('Should export the smoothScroll module', function () {
			expect(smoothScroll).toBeDefined();
		});

		it('Should expose public functions', function () {
			expect(smoothScroll.init).toEqual(jasmine.any(Function));
			expect(smoothScroll.destroy).toEqual(jasmine.any(Function));
			expect(smoothScroll.animateScroll).toEqual(jasmine.any(Function));
		});

		it('Should add event listeners', function () {
			spyOn(document, 'addEventListener');
			smoothScroll.init();
			expect(document.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);

			spyOn(document, 'removeEventListener');
			smoothScroll.destroy();
			expect(document.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
		});
	});


	//
	// Events
	//

	describe('Should animate scroll when anchor clicked', function () {
		var elt = injectElem('#anchor', true);
		document.body.setAttribute('id', 'anchor');

		afterEach(function () {
			smoothScroll.destroy();
		});

		it('Should trigger smooth scrolling on click', function () {
			spyOn(smoothScroll, 'animateScroll');
			smoothScroll.init();
			simulateClick(elt);
			expect(smoothScroll.animateScroll).toHaveBeenCalledWith(elt, '#anchor', jasmine.objectContaining(settingsStub));
		});

		it('Should do nothing if not initialized', function () {
			spyOn(smoothScroll, 'animateScroll');
			simulateClick(elt);
			expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
		});

		it('Should do nothing if destroyed', function () {
			spyOn(smoothScroll, 'animateScroll');
			smoothScroll.init();
			smoothScroll.destroy();
			simulateClick(elt);
			expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
		});
	});

	describe('Should run callbacks', function () {
		var elt = injectElem('#anchor', true);
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

		it('Should run callback before', function (done) {
			var settings = {
				callbackBefore: callback(elt, '#anchor', done)
			};
			smoothScroll.init(settings);
			simulateClick(elt);
		});

		it('Should run callback after', function (done) {
			var settings = {
				callbackAfter: callback(elt, '#anchor', done)
			};
			smoothScroll.init(settings);
			simulateClick(elt);
		});

		it('Should run callbacks in the right order', function (done) {
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
