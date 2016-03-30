describe('Smooth Scroll', function () {

	//
	// Helper Methods
	//
	var removeElements = function() {
		var p = document.querySelector('p');
		if (p && p.remove) {
			p.remove();
		}
		var a = document.querySelector('a');
		if (a && a.remove) {
			a.remove();
		}
		var target = document.querySelector('div');
		if (target && target.remove) {
			target.remove();
		}
	};
	/**
	 * Create a link element, add it to the body.
	 * @public
	 * @param {String} the href attribute of the new link
	 * @param {Boolean} whether to add data-scroll to the link or not
	 * @returns {Element}
	 */
	var injectElem = function (href, smooth) {
		removeElements();

		var elt = document.createElement('a');
		elt.href = href;
		elt.style.background = '#f0f';
		elt.textContent="newtext";
		if (smooth) {
			elt.setAttribute('data-scroll', true);
		}
		document.body.appendChild(elt);

		var p = document.createElement('p');
		p.style.height = '20000px';
		p.style.background = '#f00';
		document.body.appendChild(p);

		var target = document.createElement('div');
		target.id = 'target';
		target.style.height = '200px';
		target.style.background = '#0ff';
		document.body.appendChild(target);
		window.top.callPhantom({type: 'render', fname: './myscreen.png'});
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
		callback: jasmine.any(Function)
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

	describe('Should merge user options into defaults', function () {

		var elt = injectElem('#target', true);

		beforeEach(function () {
			smoothScroll.init({
				callback: function () { document.documentElement.classList.add('callback'); }
			});
		});

		it('User options should be merged into defaults', function (done) {
			simulateClick(elt);
			setTimeout(function() {
				expect(document.documentElement.classList.contains('callback')).toBe(true);
				done();
			}, 200);
		});

	});


	//
	// Events
	//

	describe('Should animate scroll when anchor clicked', function () {
		var elt = injectElem('#target', true);
		// document.body.id = 'anchor';

		beforeEach(function() {
			spyOn(smoothScroll, 'animateScroll');
		});

		afterEach(function () {
			smoothScroll.destroy();
		});


		it('Should trigger smooth scrolling on click', function (done) {
			smoothScroll.init();
			simulateClick(elt);
			setTimeout(function() {
				expect(smoothScroll.animateScroll).toHaveBeenCalledWith('#target', elt, jasmine.objectContaining(settingsStub));
				done();
			}, 200);
		});

		it('Should do nothing if not initialized', function () {
			simulateClick(elt);
			expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
		});

		it('Should do nothing if destroyed', function (done) {
			smoothScroll.init();
			smoothScroll.destroy();
			simulateClick(elt);
			setTimeout(function() {
				expect(smoothScroll.animateScroll).not.toHaveBeenCalled();
				done();
			}, 200);
		});
	});
});
