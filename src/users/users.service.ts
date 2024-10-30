import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { databaseSchema } from 'src/database/database-schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly drizzleService:DrizzleService) {}

    async create(CreateUserDto: CreateUserDTO) {
        const {password, ...userWithoutPasswordDto} = CreateUserDto;

        const hashedPassword = await hash(password, 10);

        const user = await this.drizzleService.db
            .insert(databaseSchema.users)
            .values({password: hashedPassword, ...userWithoutPasswordDto})
            .returning()
            .catch((err) => {
                if (err.code === '23505') {
                    throw new BadRequestException('Username already');
                }
                throw new Error();
            });

        return user![0];
    }

    async findAll() {
        const users = await this.drizzleService.db.query.users.findMany();
        return users;
    }

    async findOne(id: string) {
        const user = await this.drizzleService.db.query.users.findFirst({
            where: (user, { eq }) => eq(user.id, id),
        });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    async findByUsername(username: string) {
        const user = await this.drizzleService.db.query.users.findFirst({
            where: eq(databaseSchema.users.username, username)
        })

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDTO) {
        const users = await this.drizzleService.db
            .update(databaseSchema.users)
            .set({ ...updateUserDto, updated_at: new Date() })
            .where(eq(databaseSchema.users.id, id))
            .returning();

        if (users.length === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return users[0];
    }

    async delete(id: string) {
        // vérifier si l'utilisateur existe avant de le supprimer
        const user = await this.drizzleService.db.query.users.findFirst({
            where: (user, { eq }) => eq(user.id, id),
        });

        if (!user) {
            throw new NotFoundException(`User width id ${id} not found`);
        }

        // Supprimer l'utilisateur s'il existe
        const deletedUser = await this.drizzleService.db
            .delete(databaseSchema.users)
            .where(eq(databaseSchema.users.id, id))
            .returning();

        return deletedUser[0];
    }

}
