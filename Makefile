TESTS = test/*.js
REPORTER = spec #dot

test:
	@./node_modules/.bin/mocha \
		--require chai \
		--require test/common.js \
		--reporter $(REPORTER) \
		--growl \
		$(TESTS)

.PHONY: test bench