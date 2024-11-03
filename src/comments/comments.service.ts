import { Injectable, NotFoundException } from "@nestjs/common";
import { comments, databaseSchema } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { UpdateCommentDTO } from "./dto/update-comment.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class CommentsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(createCommentDto: CreateCommentDTO) {
        const comment = await this.drizzleService.db
            .insert(databaseSchema.comments)
            .values({ ...createCommentDto})
            .returning();

        return comment[0];
    }

    async findAll() {
        const comments = await this.drizzleService.db.query.comments.findMany();
        return comments;
    }

    async findOne(id: string) {
        const comment = await this.drizzleService.db.query.comments.findFirst({
            where: (comment, { eq }) => eq(comment.id, id),
        });

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return comment;
    }

    async update(id: string, updateCommentDto: UpdateCommentDTO) {
        const comments = await this.drizzleService.db
            .update(databaseSchema.comments)
            .set({ ...updateCommentDto, updated_at: new Date() })
            .where(eq(databaseSchema.comments.id, id))
            .returning();

        if (comments.length === 0) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return comments[0];
    }

    async delete(id: string) {
        const comment = await this.drizzleService.db.query.comments.findFirst({
            where: (comment, { eq }) => eq(comment.id, id),
        });

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        const deletedComment = await this.drizzleService.db
            .delete(databaseSchema.comments)
            .where(eq(databaseSchema.comments.id, id))
            .returning();

        return deletedComment[0];
    }
}
