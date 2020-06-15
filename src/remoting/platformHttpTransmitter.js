import Emitter from 'emitter-component';


import { exists } from '../utils';
import { DolphinRemotingError, DolphinSessionError } from './errors';
import Codec from './commands/codec';
import RemotingErrorHandler from './remotingErrorHandler';
import { LoggerFactory, LogLevel } from '../logging';
import {VALUE_CHANGED_COMMAND_ID, START_LONG_POLL_COMMAND_ID} from './commands/commandConstants';

const DOLPHIN_SESSION_TIMEOUT = 408;

export default class PlatformHttpTransmitter {

    constructor(url, config, client) {
        this.url = url;
        this.config = config;
        this.client = client;
        this.headersInfo = exists(config) ? config.headersInfo : null;
        this.failed_attempt = 0;

        const connectionConfig =  this._connectionConfig();
        this.maxRetry = exists(connectionConfig) && exists(connectionConfig.maxRetry)?connectionConfig.maxRetry: 3;
        this.timeout = exists(connectionConfig) && exists(connectionConfig.timeout)?connectionConfig.timeout: 5000;
    }

    _connectionConfig() {
        return exists(this.config) ? this.config.connection : null;
    }

    _handleError(reject, error) {
        const connectionConfig =  this._connectionConfig();
        let errorHandlers = exists(connectionConfig) && exists(connectionConfig.errorHandlers)?connectionConfig.errorHandlers: [new RemotingErrorHandler()];
        errorHandlers.forEach(function(handler) {
            handler.onError(error);
        });
        reject(error);
    }

    _send(commands) {
        const self = this;
        return new Promise((resolve, reject) => {
            if (this.client) {
                const encodedCommands = Codec.encode(commands);

                if (PlatformHttpTransmitter.LOGGER.isLogLevelUsable(LogLevel.DEBUG) && !PlatformHttpTransmitter.LOGGER.isLogLevelUsable(LogLevel.TRACE)) {
                    for (let i = 0; i < commands.length; i++) {
                        let command = commands[i];
                        if (command.id === VALUE_CHANGED_COMMAND_ID) {
                            PlatformHttpTransmitter.LOGGER.debug('send', command, encodedCommands);
                        }
                    }
                }

                const useWorker = commands.length === 1 && commands[0].id === START_LONG_POLL_COMMAND_ID;
                const httpClient = this.client.getService('HttpClient');
                if (httpClient && self.failed_attempt <= self.maxRetry) {
                    httpClient.post(self.url)
                    .withHeadersInfo(this.headersInfo)
                    .withContent(encodedCommands)
                    .readString()
                    .execute(useWorker)
                    .then((response) => {
                        resolve(response.content);
                    })
                    .catch((exception) => {
                        const status = exception.getStatus();
                        self.failed_attempt += 1;
                        if (status === DOLPHIN_SESSION_TIMEOUT) {
                            self._handleError(reject, new DolphinSessionError('PlatformHttpTransmitter: Session Timeout'));
                        } else {
                            self._handleError(reject, exception);
                        }
                    });
                } else {
                    //TODO handle failure
                    PlatformHttpTransmitter.LOGGER.error('Cannot reach the sever');
                }
            } else {
                PlatformHttpTransmitter.LOGGER.error('No Rico client found!');
            }
        });
    }

    transmit(commands, onDone, onError) {
        this._send(commands)
            .then(responseText => {
                if (responseText.trim().length > 0) {
                    try {
                        const responseCommands = Codec.decode(responseText);
                        onDone(responseCommands);
                    } catch (err) {
                        const errorMsg = 'PlatformHttpTransmitter: Parse error: (Incorrect response = ' + responseText + ')';
                        this.emit('error', new DolphinRemotingError(errorMsg));
                        onError(errorMsg);
                    }
                } else {
                    const errorMsg = 'PlatformHttpTransmitter: Empty response';
                    this.emit('error', new DolphinRemotingError(errorMsg));
                    onError(errorMsg);
                }
            })
            .catch(error => {
                this.emit('error', error);
                onError(error);
            });
    }

    signal(command) {
        this._send([command])
            .catch(error => this.emit('error', error));
    }
}

PlatformHttpTransmitter.LOGGER = LoggerFactory.getLogger('PlatformHttpTransmitter');

Emitter(PlatformHttpTransmitter.prototype);
