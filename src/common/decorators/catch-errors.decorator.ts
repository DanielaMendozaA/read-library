import { Injectable, HttpException, Logger, NotFoundException } from '@nestjs/common';
import { ExceptionHandlerService } from '../services/error-database-handler.service';

export function CatchErrors() {
  return function (constructor: Function) {
    const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
      .filter(method => method !== 'constructor')
      .map(method => ({
        name: method,
        descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, method),
      }));

    for (const { name, descriptor } of originalMethods) {
      if (descriptor && typeof descriptor.value === 'function') {
        const originalMethod = descriptor.value;

        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        const metadata = metadataKeys.map(key => ({ key, value: Reflect.getMetadata(key, originalMethod) }));

        descriptor.value = async function (...args: any[]) {
          const exceptionHandlerService: ExceptionHandlerService = this.exceptionHandlerService;
          const loggerService: Logger = this.loggerService;
          const className = constructor.name;

          try {
            const result = await originalMethod.apply(this, args);
            return result;
          } catch (error) {
            console.log("error desde decorator", error);

            loggerService.error(`Error in ${className}.${name}: ${error.message}`);

            if (error instanceof HttpException) {
              throw error;
            }

            const handledError = exceptionHandlerService.handleDatabaseError(error);

            throw handledError instanceof HttpException ? handledError : new HttpException(error.message || 'Internal server error', 500);
          }
        };

        metadata.forEach(({ key, value }) => {
          Reflect.defineMetadata(key, value, descriptor.value);
        });

        Object.defineProperty(constructor.prototype, name, descriptor);
      }
    }
  };
}
