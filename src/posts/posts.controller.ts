import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDTO) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.postsService.delete(id);
    }

    @Get(':id/comments')
    async getPostComments(@Param('id') id: string) {
        return this.postsService.getPostComments(id);
    }
}
