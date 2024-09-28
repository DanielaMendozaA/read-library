import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JoiValidation } from './common/config/joi-validation.config';
import { BooksModule } from './books/books.module';
import { CommonModule } from './common/common.module';
import { BookSeeder } from './common/seeders/book.seeder.service';
import { ApiKeyGuard } from './guard/api-key-guard.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidation,
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    BooksModule,
    CommonModule
  ],
  providers: [BookSeeder, Logger, ApiKeyGuard],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly bookRunner: BookSeeder,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    const seed = this.configService.get<string>('EXECUTE_SEEDS');
    console.log(seed);
    if (this.configService.get<boolean>('EXECUTE_SEEDS') === true) {
      await this.bookRunner.run();
      this.logger.log('Seeds executed');
    }else{
      this.logger.log('Seeds not executed');
    }
  }

}
