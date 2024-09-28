import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    const validApiKey = this.configService.get<string>('API_KEY');
    console.log( "api key y valid api",apiKey, validApiKey);
    
    return apiKey === validApiKey;
  }
}
