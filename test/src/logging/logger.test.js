/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import { LogLevel }  from '../../../src/logging/index';
import { Logger }  from '../../../src/logging/logger';

const dateMatch = /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}/;

describe('Logger', function() {

    it('Logger is an object', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger).to.be.an('object');
    });

    it('Logger has trace function', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger.trace).to.be.an('function');
    });

    it('Logger has debug function', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger.debug).to.be.an('function');
    });

    it('Logger has info function', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger.info).to.be.an('function');
    });

    it('Logger has warn function', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger.warn).to.be.an('function');
    });

    it('Logger has error function', function() {
        // given:
        let logger = new Logger('TEST');

        // then:
        expect(logger.error).to.be.an('function');
    });

    it('Set log level by name', function() {
        // given:
        let logger = new Logger('TEST');

        // when:
        logger.setLogLevelByName('DEBUG');

        // then:
        expect(logger.getLogLevel()).to.be.equal(LogLevel.DEBUG);
    });

    it('Is correct LogLevel useable', function() {
        // given:
        let logger = new Logger('TEST');

        // when:
        logger.setLogLevel(LogLevel.DEBUG);

        // then:
        expect(logger.isLogLevelUseable(LogLevel.ERROR)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.WARN)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.INFO)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.DEBUG)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.TRACE)).to.be.false;
    });

    it('Is correct LogLevel useable', function() {
        // given:
        let logger = new Logger('TEST');

        // when:
        logger.setLogLevel(LogLevel.ERROR);

        // then:
        expect(logger.isLogLevelUseable(LogLevel.ERROR)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.WARN)).to.be.false;
        expect(logger.isLogLevelUseable(LogLevel.INFO)).to.be.false;
        expect(logger.isLogLevelUseable(LogLevel.DEBUG)).to.be.false;
        expect(logger.isLogLevelUseable(LogLevel.TRACE)).to.be.false;
    });

    it('Is correct LogLevel useable', function() {
        // given:
        let logger = new Logger('TEST');

        // when:
        logger.setLogLevel(LogLevel.ALL);

        // then:
        expect(logger.isLogLevelUseable(LogLevel.ERROR)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.WARN)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.INFO)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.DEBUG)).to.be.true;
        expect(logger.isLogLevelUseable(LogLevel.TRACE)).to.be.true;
    });

    it('Log debug message', sinon.test(function() {
            // given:
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.DEBUG);
            logger.debug('test');

            // then:
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWithMatch(dateMatch, LogLevel.DEBUG.text, /.*/, 'test')).to.be.true;
        })
    );

    it('Log info message', sinon.test(function() {
            // given:
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.info('test');

            // then:
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWithMatch(dateMatch, LogLevel.INFO.text, /.*/, 'test')).to.be.true;
        })
    );

    it('Log trace message', sinon.test(function() {
            // given:
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.TRACE);
            logger.trace('test');

            // then:
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWithMatch(dateMatch, LogLevel.TRACE.text, /.*/, 'test')).to.be.true;
        })
    );

    it('Log error message', sinon.test(function() {
            // given:
            this.stub(console, 'error');
            let logger = new Logger('TEST');

            // when:
            logger.error('test');

            // then:
            expect(console.error.calledOnce).to.be.true;
            expect(console.error.calledWithMatch(dateMatch, LogLevel.ERROR.text, /.*/, 'test')).to.be.true;
        })
    );

    it('Log warn message', sinon.test(function() {
            // given:
            this.stub(console, 'warn');
            let logger = new Logger('TEST');

            // when:
            logger.warn('test');

            // then:
            expect(console.warn.calledOnce).to.be.true;
            expect(console.warn.calledWithMatch(dateMatch, LogLevel.WARN.text, /.*/, 'test')).to.be.true;
        })
    );


    ///
    it('Do not log debug message', sinon.test(function() {
            // given:
            this.stub(console, 'debug');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.INFO);
            logger.debug('test');

            // then:
            expect(console.debug.calledOnce).to.be.false;
        })
    );

    it('Do not log info message', sinon.test(function() {
            // given:
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.WARN);
            logger.info('test');

            // then:
            expect(console.log.calledOnce).to.be.false;
        })
    );

    it('Do not log trace message', sinon.test(function() {
            // given:
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.DEBUG);
            logger.trace('test');

            // then:
            expect(console.log.calledOnce).to.be.false;
        })
    );

    it('Do not log error message', sinon.test(function() {
            // given:
            this.stub(console, 'error');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.NONE);
            logger.error('test');

            // then:
            expect(console.error.calledOnce).to.be.false;
        })
    );

    it('Do not log warn message', sinon.test(function() {
            // given:
            this.stub(console, 'warn');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.ERROR);
            logger.warn('test');

            // then:
            expect(console.warn.calledOnce).to.be.false;
        })
    );



    it('Do not log', sinon.test(function() {
            // given:
            this.stub(console, 'warn');
            this.stub(console, 'error');
            this.stub(console, 'debug');
            this.stub(console, 'log');
            let logger = new Logger('TEST');

            // when:
            logger.setLogLevel(LogLevel.NONE);
            logger.warn('test');
            logger.error('test');
            logger.info('test');
            logger.debug('test');
            logger.debug('trace');

            // then:
            expect(console.error.calledOnce).to.be.false;
            expect(console.warn.calledOnce).to.be.false;
            expect(console.log.calledOnce).to.be.false;
            expect(console.debug.calledOnce).to.be.false;
            expect(console.log.calledOnce).to.be.false;
        })
    );

    it('Cookie Loglevel ERROR', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=ERROR'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.ERROR);
                
                global.window = jdomWindow;
            }
        })
    );

    it('Cookie Loglevel WARN', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=WARN'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.WARN);
                
                global.window = jdomWindow;
            }
        })
    );

    it('Cookie Loglevel INFO', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=INFO'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.INFO);
                
                global.window = jdomWindow;
            }
        })
    );

    it('Cookie Loglevel TRACE', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=TRACE'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.TRACE);
                
                global.window = jdomWindow;
            }
        })
    );

    it('Cookie Loglevel NONE', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=NONE'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.NONE);
                
                global.window = jdomWindow;
            }
        })
    );

    it('Cookie Loglevel ALL', sinon.test(function() {
            // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
            if (global.window) {
                const jdomWindow = global.window;
                global.window = {document: {cookie: 'RICO_LOGGER_TEST=ALL'}};

                let logger = new Logger('TEST');

                expect(logger.getLogLevel()).to.be.equal(LogLevel.ALL);
                
                global.window = jdomWindow;
            }
        })
    );

});