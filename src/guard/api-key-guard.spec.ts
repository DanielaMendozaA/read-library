import { ApiKeyGuard } from "./api-key-guard.guard";
import { ConfigService } from '@nestjs/config';

describe('ApiKeyGuardGuard', () => {
  let configService: ConfigService;
  
  beforeEach(() => {
    configService =  new ConfigService();
    jest.spyOn(configService, 'get').mockReturnValue('12345'); 
  });

  it('should be defined', () => {
    expect(new ApiKeyGuard(configService)).toBeDefined();
  });

  it('should return true if the api key is valid', () => {
    const apiKeyGuard = new ApiKeyGuard(configService);
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => '12345' 
        })
      })
    };

    expect(apiKeyGuard.canActivate(mockContext as any)).toBe(true);
  });

  it('should return false if the api key is invalid', () => {
    const apiKeyGuard = new ApiKeyGuard(configService);
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => 'wrong-key' 
        })
      })
    };

    expect(apiKeyGuard.canActivate(mockContext as any)).toBe(false);
  });
});
