import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDTO, updateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/utils/zod-validation';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/utils/roles/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApplyCreateUserSwagger, ApplyUpdateUserSwagger } from 'src/utils/documentation/apply-swagger-decorators';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApplyCreateUserSwagger()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès.' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', example: 'ibsa6uz7iefqm15e1scfg0nh' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApplyUpdateUserSwagger()
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', example: 'ibsa6uz7iefqm15e1scfg0nh' })
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
