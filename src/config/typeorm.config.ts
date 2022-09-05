import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmAsyncModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'sqlite',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    database: 'database.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
  }),
};
