import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { AxiosHttpService } from './http-module';

@Module({})
export class DynamicModuleModule {
  static getUrl(url: string): DynamicModule {
    return {
      module: DynamicModuleModule,
      providers: [
        {
          provide: 'GET_URL',
          useValue: url
        },
        DynamicModuleService,
        AxiosHttpService
      ],
      imports: [HttpModule],
      exports: [DynamicModuleService],
    };
  }
}
