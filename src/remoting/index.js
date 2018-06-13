import { ClientContextFactory } from './clientContextFactory'
import { ServiceProvider } from '../platform/serviceProvider'
import { exists } from '../utils'

function register(client) {
    if (exists(client)) {
        const clientContextFactoryProvider = new ServiceProvider(ClientContextFactory, 'ClientContextFactory');

        client.registerServiceProvider(clientContextFactoryProvider);
    }
}

export { register };