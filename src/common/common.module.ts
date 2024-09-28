import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './errors/exception-filter/all-exception.filter';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { ExceptionHandlerService } from './services/error-database-handler.service';

@Module({
  controllers: [],
  providers: [
    {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  ExceptionHandlerService
],
exports: [
  ExceptionHandlerService,
],
})
export class CommonModule {}
