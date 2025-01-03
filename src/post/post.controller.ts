import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostQueryParamsDto } from './dto/post-query-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../decorators/user.decorator';
import { LoggedUser } from '../auth/models/user';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Posts')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiBody({ type: CreatePostDto })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user: LoggedUser) {
    // Here we can access the logged in user object
    // You could pass it next to the service layer
    console.log(user);

    return this.postService.create(createPostDto);
  }

  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Default value: 10',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Default value: 0',
  })
  @Get()
  @ApiResponse({ status: 200, type: [CreatePostDto] })
  findAll(@Query() queryParams?: PostQueryParamsDto) {
    queryParams.limit = queryParams.limit || 10;
    queryParams.offset = queryParams.offset || 0;

    return this.postService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
