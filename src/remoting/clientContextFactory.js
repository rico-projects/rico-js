import { dolphinBuilder } from './dolphinBuilder';
import { checkMethod, checkParam } from '../utils';
import { LoggerFactory } from '../logging';
import Connector from './connector';
import BeanManager from './beanmanager';
import ClassRepository from './classrepo';
import ControllerManager from './controllermanager';
import ClientContext from './clientcontext';
import PlatformHttpTransmitter from './platformHttpTransmitter';

class ClientContextFactory {

    create(url, config){
        checkMethod('connect(url, config)');
        checkParam(url, 'url');
        ClientContextFactory.LOGGER.debug('Creating client context', url, config);

        const transmitter = new PlatformHttpTransmitter(url, config);
        transmitter.on('error', function (error) {
            clientContext.emit('error', error);
        });

        const dolphin = dolphinBuilder
            .withTransmitter(transmitter)
            .withSlackMS(4)
            .withMaxBatchSize(Number.MAX_SAFE_INTEGER)
            .build();


        const classRepository = new ClassRepository(dolphin);
        const beanManager = new BeanManager(classRepository);
        const connector = new Connector(url, dolphin, classRepository, config);
        const controllerManager = new ControllerManager(dolphin, classRepository, connector);

        const clientContext = new ClientContext(dolphin, beanManager, controllerManager, connector);

        ClientContextFactory.LOGGER.debug('clientContext created with', clientContext);

        return clientContext;
    }
}

ClientContextFactory.LOGGER = LoggerFactory.getLogger('ClientContextFactory');

let createClientContext = new ClientContextFactory().create;

export { createClientContext, ClientContextFactory };