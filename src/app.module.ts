import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleService } from './database/drizzle.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, CommentsModule, PostsModule, ConfigModule.forRoot(), DatabaseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('POSTGRES_HOST') || 'localhost',
        port: configService.get<number>('POSTGRES_PORT') || 5432,
        user: configService.get<string>('POSTGRES_USER')!,
        password: configService.get<string>('POSTGRES_PASSWORD')!,
        database: configService.get<string>('POSTGRES_DB')!,
      }),
  }), AuthModule,
],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
