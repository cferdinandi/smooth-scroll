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
    });
});
