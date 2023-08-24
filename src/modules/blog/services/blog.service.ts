import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBlogDto } from '../dto/create-blog.dto';
import slugify from 'slugify';
import { Blog } from '../entities/blog.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UpdateBlogDto } from '../dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private dataSource: DataSource) {}
  async checkSlugExists(slug: string) {
    return await this.dataSource
      .getRepository(Blog)
      .findOne({ where: { slug } });
  }

  async createBlog(
    user: User,
    payload: CreateBlogDto,
    fileName: string,
  ) {
    const slug = payload.slug
      ? slugify(payload.slug, { lower: true })
      : slugify(payload.title, { lower: true });
    const existingSlug = await this.checkSlugExists(slug);
    if (existingSlug)
      throw new BadRequestException('Blog already exists');

    const blog = await this.dataSource
      .getRepository(Blog)
      .save({
        ...payload,
        slug,
        user_id: user.id,
        image: fileName,
      });

    return {
      success: true,
      data: blog,
    };
  }

  async updateBlog(
    blogId: string,
    payload: UpdateBlogDto,
    fileName: string,
  ) {
    const existingBlog = await this.dataSource
      .getRepository(Blog)
      .findOne({
        where: { id: blogId },
      });
    if (!existingBlog)
      throw new BadRequestException('Blog not found');

    const blog = await this.dataSource
      .getRepository(Blog)
      .save({
        id: existingBlog.id,
        ...payload,
        image: fileName,
      });

    return { success: true, data: blog };
  }

  async deleteBlog(blogId: string) {
    const existingBlog = await this.dataSource
      .getRepository(Blog)
      .findOne({
        where: { id: blogId },
      });
    if (!existingBlog)
      throw new BadRequestException('Blog not found');

    return await this.dataSource
      .getRepository(Blog)
      .delete(blogId);
  }
}
