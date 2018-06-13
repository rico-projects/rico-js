import { HttpClient } from './httpClient';
import { HttpClientInterceptor } from './httpClientInterceptor';
import { ServiceProvider } from '../platform/serviceProvider';
import { exists } from '../utils'

function register(client) {
    if (exists(client)) {
        const httpClientProvider = new ServiceProvider(HttpClient, 'HttpClient');
        const httpClientInterceptorProvider = new ServiceProvider(HttpClientInterceptor, 'HttpClientInterceptor');
    
        client.registerServiceProvider(httpClientProvider);
        client.registerServiceProvider(httpClientInterceptorProvider);
    }
}

export { register }