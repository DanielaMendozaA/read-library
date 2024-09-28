import { ResponseInterceptor } from './response.interceptor';
import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { IResponse } from 'src/common/interfaces/response-interceptor.interface';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should return a formatted response with body', (done) => {
    const mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        statusCode: 200,
      }),
    } as unknown as ExecutionContext;

    const mockCallHandler: CallHandler = {
      handle: jest.fn(() => of({ test: 'data' })),
    };


    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe((result: IResponse<any>) => {
      expect(result).toEqual({
        statusCode: 200,
        message: 'Request was successfully',
        data: { test: 'data' }
      });
      done();  // Indica que la prueba asíncrona ha finalizado
    });
  });

  it('should return a formatted response with no body', (done) => {
    const mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({
        statusCode: 200,
      }),
    } as unknown as ExecutionContext;

    const mockCallHandler: CallHandler = {
      handle: jest.fn(() => of(null)),  // En este caso el body es null
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe((result: IResponse<any>) => {
      expect(result).toEqual({
        statusCode: 200,
        message: 'There is not a body',
        data: null
      });
      done();
    });
  });
});

