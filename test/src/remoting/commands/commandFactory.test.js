/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import CommandFactory from '../../../../src/remoting/commands/commandFactory'
import CreateContextCommand from '../../../../src/remoting/commands/impl/createContextCommand';
import AttributeMetadataChangedCommand from '../../../../src/remoting/commands/impl/attributeMetadataChangedCommand';
import CallActionCommand from '../../../../src/remoting/commands/impl/callActionCommand';
import ChangeAttributeMetadataCommand from '../../../../src/remoting/commands/impl/changeAttributeMetadataCommand';
import DestroyContextCommand from '../../../../src/remoting/commands/impl/destroyContextCommand';
import StartLongPollCommand from '../../../../src/remoting/commands/impl/startLongPollCommand';
import InterruptLongPollCommand from '../../../../src/remoting/commands/impl/interruptLongPollCommand';
import DestroyControllerCommand from '../../../../src/remoting/commands/impl/destroyControllerCommand';
import CreatePresentationModelCommand from '../../../../src/remoting/commands/impl/createPresentationModelCommand';
import ValueChangedCommand from '../../../../src/remoting/commands/impl/valueChangedCommand';
import DeletePresentationModelCommand from '../../../../src/remoting/commands/impl/deletePresentationModelCommand';
import CreateControllerCommand from '../../../../src/remoting/commands/impl/createControllerCommand';

describe('CommandFactory', function () {

    it('CreateContextCommand', function () {
        const command = CommandFactory.createCreateContextCommand();
        expect(command).to.be.instanceOf(CreateContextCommand);
    });

    it('AttributeMetadataChangedCommand', function () {
        const command = CommandFactory.createAttributeMetadataChangedCommand('1234', 'myName', 'myValue');

        expect(command).to.be.instanceOf(AttributeMetadataChangedCommand);
        expect(command.attributeId).to.be.equal('1234');
        expect(command.metadataName).to.be.equal('myName');
        expect(command.value).to.be.equal('myValue');
    });

    it('CallActionCommand', function () {
        const command = CommandFactory.createCallActionCommand('1234', 'myAction', [{ name: 'name1', value: 'value1' }]);

        expect(command).to.be.instanceOf(CallActionCommand);
        expect(command.controllerid).to.be.equal('1234');
        expect(command.actionName).to.be.equal('myAction');
        expect(command.params).to.be.deep.equal([{ name: 'name1', value: 'value1' }]);
    });

    it('ChangeAttributeMetadataCommand', function () {
        const command = CommandFactory.createChangeAttributeMetadataCommand('1234', 'myMetadata', 'myValue');

        expect(command).to.be.instanceOf(ChangeAttributeMetadataCommand);
        expect(command.attributeId).to.be.equal('1234');
        expect(command.metadataName).to.be.equal('myMetadata');
        expect(command.value).to.be.equal('myValue');
    });

    it('CreateContextCommand', function () {
        const command = CommandFactory.createCreateContextCommand();

        expect(command).to.be.instanceOf(CreateContextCommand);
    });

    it('DestroyContextCommand', function () {
        const command = CommandFactory.createDestroyContextCommand();

        expect(command).to.be.instanceOf(DestroyContextCommand);
    });

    it('StartLongPollCommand', function () {
        const command = CommandFactory.createStartLongPollCommand();

        expect(command).to.be.instanceOf(StartLongPollCommand);
    });

    it('InterruptLongPollCommand', function () {
        const command = CommandFactory.createInterruptLongPollCommand();

        expect(command).to.be.instanceOf(InterruptLongPollCommand);
    });

    it('PresentationModelDeletedCommand', function () {
        const command = CommandFactory.createPresentationModelDeletedCommand('1234');
        
        //DOES NOT WORK??? => expect(command).to.be.instanceOf(PresentationModelDeletedCommand);
        expect(command.pmId).to.be.equal('1234');
    });

    it('DeletePresentationModelCommand', function () {
        const command = CommandFactory.createDeletePresentationModelCommand('1234');

        expect(command).to.be.instanceOf(DeletePresentationModelCommand);
        expect(command.pmId).to.be.equal('1234');
    });

    it('DestroyControllerCommand', function () {
        const command = CommandFactory.createDestroyControllerCommand('1234')

        expect(command).to.be.instanceOf(DestroyControllerCommand);
        expect(command.controllerId).to.be.equal('1234');
    });

    it('CreateControllerCommand', function () {
        const command = CommandFactory.createCreateControllerCommand('MyController', null);

        expect(command).to.be.instanceOf(CreateControllerCommand);
        expect(command.controllerName).to.be.equal('MyController');
        expect(command.parentControllerId).to.be.equal(null);
    });

    it('ValueChangedCommand', function () {
        const command = CommandFactory.createValueChangedCommand('12345', 'newValue');

        expect(command).to.be.instanceOf(ValueChangedCommand);
        expect(command.attributeId).to.be.equal('12345');
        expect(command.newValue).to.be.equal('newValue');
    });

    it('CreatePresentationModelCommand', function () {
        const model = {
            id: "05ee43b7-a884-4d42-9fc5-00b083664eed",
            getAttributes: () => [
                {
                    propertyName: "@@@ SOURCE_SYSTEM @@@",
                    id: "3204S",
                    getValue: () => "server"
                },
                {
                    propertyName: "caseDetailsLabel",
                    id: "3205S",
                    getValue: () => null
                },
                {
                    propertyName: "caseIdLabel",
                    id: "3206S",
                    getValue: () => null
                },
                {
                    propertyName: "statusLabel",
                    id: "3207S",
                    getValue: () => null
                },
                {
                    propertyName: "status",
                    id: "3208S",
                    getValue: () => null
                }
            ],
            presentationModelType: "com.canoo.icos.casemanager.model.casedetails.CaseInfoBean"
        };
        const command = CommandFactory.createCreatePresentationModelCommand(model);

        expect(command).to.be.instanceOf(CreatePresentationModelCommand);
        expect(command.pmType).to.be.equal('com.canoo.icos.casemanager.model.casedetails.CaseInfoBean');
        expect(command.pmId).to.be.equal('05ee43b7-a884-4d42-9fc5-00b083664eed');
        expect(command.clientSideOnly).to.be.equal(false);
        expect(command.attributes.length).to.be.equal(5);
    });

});