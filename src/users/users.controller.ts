import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDTO, updateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/utils/zod-validation';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/utils/roles/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDTO) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
