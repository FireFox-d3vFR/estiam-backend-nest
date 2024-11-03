import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleService } from './database/drizzle.service';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        UsersModule,
        CommentsModule,
        PostsModule,
        ConfigModule.forRoot(),
        DatabaseModule.forRootAsync(),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, DrizzleService],
})

export class AppModule{}
