
import { ServiceProvider } from '../platform/serviceProvider';
import { exists } from '../utils'
import { KeycloakSecurity } from './keycloakSecurity';

function register(client) {
    if (exists(client)) {
        const securityProvider = new ServiceProvider(KeycloakSecurity, 'Security', client);
        client.registerServiceProvider(securityProvider);
    }
}

export { register }