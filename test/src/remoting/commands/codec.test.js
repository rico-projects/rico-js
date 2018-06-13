/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import Codec from '../../../../src/remoting/commands/codec.js';
import { commandDef, resultDef } from './helper/codec.def';

describe('encode', function() {

    it('should encode an empty array', function() {
        let json = Codec.encode([]);
        expect(json).to.equal('[]');
    });

    it('should encode single CreatePresentationModelCommand', function() {
        let command = commandDef.CreatePresentationModel;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.CreatePresentationModel + ']');
    });

    it('should encode single CreateContextCommand', function() {
        let command = commandDef.CreateContext;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.CreateContext + ']');
    });

    it('should encode single CreateControllerCommand', function() {
        let command = commandDef.CreateController;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.CreateController + ']');
    });

    it('should encode single LongPollCommand', function() {
        let command = commandDef.LongPoll;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.LongPoll + ']');
    });

    it('should encode single InterruptLongPollCommand', function() {
        let command = commandDef.InterruptLongPoll;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.InterruptLongPoll + ']');
    });

    it('should encode single AttributeMetadataChangedCommand', function() {
        let command = commandDef.AttributeMetadataChanged;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.AttributeMetadataChanged + ']');
    });

    it('should encode single CallActionCommand', function() {
        let command = commandDef.CallAction;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.CallAction + ']');
    });

    it('should encode single DeletePresentationModelCommand', function() {
        let command = commandDef.DeletePresentationModel;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.DeletePresentationModel + ']');
    });

    it('should encode single DestroyContextCommand', function() {
        let command = commandDef.DestroyContext;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.DestroyContext + ']');
    });

    it('should encode single DestroyControllerCommand', function() {
        let command = commandDef.DestroyController;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.DestroyController + ']');
    });

    it('should encode single PresentationModelDeletedCommand', function() {
        let command = commandDef.PresentationModelDeleted;
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal('[' + resultDef.PresentationModelDeleted + ']');
    });

    it('should encode single ValueChangedCommand with nulls', function() {
        let command = commandDef.ValueChanged(null, null);
        let jsonString = Codec.encode([command]);
        expect(jsonString).to.equal(resultDef.ValueChanged(null, null));
    });

    it('should encode single ValueChangedCommand with Strings', function() {
        let command = commandDef.ValueChanged("Hello World", "Good Bye");
        let json = Codec.encode([command]);
        expect(json).to.equal(resultDef.ValueChanged("Hello World", "Good Bye"));
    });

    it('should encode single ValueChangedCommand with ints', function() {
        let command = commandDef.ValueChanged(41, 42);
        let json = Codec.encode([command]);
        expect(json).to.equal(resultDef.ValueChanged(41, 42));
    });

    it('should encode single ValueChangedCommand with floating points', function() {
        let command = commandDef.ValueChanged(3.1415, 2.7182);
        let json = Codec.encode([command]);
        expect(json).to.equal(resultDef.ValueChanged(3.1415, 2.7182));
    });

    it('should encode single ValueChangedCommand with booleans', function() {
        let command = commandDef.ValueChanged(true, false);
        let json = Codec.encode([command]);
        expect(json).to.equal(resultDef.ValueChanged(true, false));
    });

    it('should encode two custom codec commands', function() {
        let command = commandDef.CreatePresentationModel;
        let json = Codec.encode([command, command]);
        let expected = resultDef.CreatePresentationModel;
        expect(json).to.equal('[' + expected + ',' + expected + ']');
    });

    it('should not encode unkown', function(done) {
        let command = {"id": "SomeFunnyId"};
        try {
            Codec.encode([command]);
        } catch (error) {
            expect(error).to.exist;
            done();
        }
        
    });
});



describe('decode', function() {

    it('should decode an empty array', function() {
        let commands = Codec.decode('[]');

        expect(commands).to.be.empty;
    });

    it('should decode single CreatePresentationModelCommand', function() {
        let commands = Codec.decode('[' + resultDef.CreatePresentationModel + ']');

        expect(commands).to.deep.equal([commandDef.CreatePresentationModel]);
    });

    it('should decode single CreateContextCommand', function() {
        let commands = Codec.decode('[' + resultDef.CreateContext + ']');

        expect(commands).to.deep.equal([commandDef.CreateContext]);
    });

    it('should decode single CreateControllerCommand', function() {
        let commands = Codec.decode('[' + resultDef.CreateController + ']');

        expect(commands).to.deep.equal([commandDef.CreateController]);
    });

    it('should decode single LongPollCommand', function() {
        let commands = Codec.decode('[' + resultDef.LongPoll + ']');

        expect(commands).to.deep.equal([commandDef.LongPoll]);
    });

    it('should decode single InterruptLongPollCommand', function() {
        let commands = Codec.decode('[' + resultDef.InterruptLongPoll + ']');

        expect(commands).to.deep.equal([commandDef.InterruptLongPoll]);
    });

    it('should decode single AttributeMetadataChangedCommand', function() {
        let commands = Codec.decode('[' + resultDef.AttributeMetadataChanged + ']');

        expect(commands).to.deep.equal([commandDef.AttributeMetadataChanged]);
    });

    it('should decode single CallActionCommand', function() {
        let commands = Codec.decode('[' + resultDef.CallAction + ']');

        expect(commands).to.deep.equal([commandDef.CallAction]);
    });

    it('should decode single DeletePresentationModelCommand', function() {
        let commands = Codec.decode('[' + resultDef.DeletePresentationModel + ']');

        expect(commands).to.deep.equal([commandDef.DeletePresentationModel]);
    });

    it('should decode single DestroyContextCommand', function() {
        let commands = Codec.decode('[' + resultDef.DestroyContext + ']');

        expect(commands).to.deep.equal([commandDef.DestroyContext]);
    });

    it('should decode single DestroyControllerCommand', function() {
        let commands = Codec.decode('[' + resultDef.DestroyController + ']');

        expect(commands).to.deep.equal([commandDef.DestroyController]);
    });

    it('should decode single PresentationModelDeletedCommand', function() {
        let commands = Codec.decode('[' + resultDef.PresentationModelDeleted + ']');

        expect(commands).to.deep.equal([commandDef.PresentationModelDeleted]);
    });

    it('should decode single ValueChangedCommand with nulls', function() {
        let commands = Codec.decode(resultDef.ValueChanged(null, null));

        expect(commands).to.deep.equal([commandDef.ValueChanged(null, null)]);
    });

    it('should decode single ValueChangedCommand with Strings', function() {
        let commands = Codec.decode(resultDef.ValueChanged(null, "Good Bye"));

        expect(commands).to.deep.equal([commandDef.ValueChanged(null, "Good Bye")]);
    });

    it('should decode single ValueChangedCommand with ints', function() {
        let commands = Codec.decode(resultDef.ValueChanged(null, 42));

        expect(commands).to.deep.equal([commandDef.ValueChanged(null, 42)]);
    });

    it('should decode single ValueChangedCommand with floating points', function() {
        let commands = Codec.decode(resultDef.ValueChanged(null, 2.7182));

        expect(commands).to.deep.equal([commandDef.ValueChanged(null, 2.7182)]);
    });

    it('should decode single ValueChangedCommand with booleans', function() {
        let commands = Codec.decode(resultDef.ValueChanged(null, false));

        expect(commands).to.deep.equal([commandDef.ValueChanged(null, false)]);
    });

    it('should decode two custom codec commands', function() {
        let customCodecCommandString = resultDef.CreatePresentationModel;

        let commands = Codec.decode('[' + customCodecCommandString + ',' + customCodecCommandString + ']');

        let customCodecCommand = commandDef.CreatePresentationModel;
        expect(commands).to.deep.equal([customCodecCommand, customCodecCommand]);
    });

    it('should not decode unkown', function(done) {
        try {
            Codec.decode('{"id":"SomeFunnyId"}');
        } catch (error) {
            expect(error).to.exist;
            done();
        }
        
    });
});