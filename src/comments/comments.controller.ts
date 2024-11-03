import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau commentaire' })
  @ApiResponse({ status: 201, description: 'Commentaire créé avec succès.' })
  create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les commentaires' })
  @ApiResponse({ status: 200, description: 'Liste des commentaires récupérée avec succès.' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un commentaire par ID' })
  @ApiResponse({ status: 200, description: 'Commentaire récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du commentaire', example: 'ibsa6uz7iefqm15e1scfg0nh' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du commentaire', example: 'ibsa6uz7iefqm15e1scfg0nh' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDTO) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Commentaire non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du commentaire', example: 'ibsa6uz7iefqm15e1scfg0nh' })
  delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
