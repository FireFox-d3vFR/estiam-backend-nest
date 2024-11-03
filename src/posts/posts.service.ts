import { Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(createPostDto: CreatePostDTO) {
        const post = await this.drizzleService.db
            .insert(databaseSchema.posts)
            .values({ ...createPostDto })
            .returning();

        return post[0];
    }

    async findAll() {
        const posts = await this.drizzleService.db.query.posts.findMany();
        return posts;
    }

    async findOne(id: string) {
        const post = await this.drizzleService.db.query.posts.findFirst({
            where: (postRow, { eq }) => eq(postRow.id, id),
        });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDTO) {
        const posts = await this.drizzleService.db
            .update(databaseSchema.posts)
            .set({ ...updatePostDto, updated_at: new Date() })
            .where(eq(databaseSchema.posts.id, id))
            .returning();

        if (posts.length === 0) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return posts[0];
    }

    async delete(id: string) {
        const post = await this.drizzleService.db.query.posts.findFirst({
            where: (postRow, { eq }) => eq(postRow.id, id),
        });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        const deletedPost = await this.drizzleService.db
            .delete(databaseSchema.posts)
            .where(eq(databaseSchema.posts.id, id))
            .returning();

        return deletedPost[0];
    }

    async getPostComments(postId: string) {
        const postWithComments = await this.drizzleService.db.query.posts.findFirst({
            where: (postRow, { eq }) => eq(postRow.id, postId),
            with: {
                comments: true,
            },
        });

        if (!postWithComments) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }

        return postWithComments;
    }
}
