import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmAsyncModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    type: 'sqlite',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    database: 'database.db',
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
  }),
};
