import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule], // Importer le module de base de données
    controllers: [PostsController],
    providers: [PostsService], // Pas besoin d'inclure DrizzleService ici
})
export class PostsModule {}
