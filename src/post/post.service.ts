import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQueryParamsDto } from './dto/post-query-params.dto';

@Injectable()
export class PostService {
  create(createPostDto: CreatePostDto) {
    console.log(createPostDto);

    return 'This action adds a new post';
  }

  findAll(queryParams?: PostQueryParamsDto) {
    console.log(queryParams);

    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
