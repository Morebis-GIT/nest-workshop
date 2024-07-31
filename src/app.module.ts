import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { migrations } from './migrations';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      synchronize: false, // prod always FALSE
      autoLoadEntities: true,
      logging: process.env.NODE_ENV !== 'production',
      migrations: migrations,
      migrationsTableName: `migrations`,
      migrationsRun: true,
    }),
    UsersModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
