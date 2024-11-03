import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DrizzleService } from 'src/database/drizzle.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CommentsController],
    providers: [CommentsService, DrizzleService],
})
export class CommentsModule {}
