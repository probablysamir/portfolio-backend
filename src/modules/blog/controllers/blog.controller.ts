import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/common/constants/role-type';
import { GetUser } from 'src/decorators/getUser.decorator';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { diskStorage } from 'multer';
import {
  generateFileName,
  imageFileFilter,
} from 'src/shared/providers/helpers';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/modules/user/entities/user.entity';
import { UpdateBlogDto } from '../dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createBlog(
    @GetUser() user: User,
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.createBlog(
      user,
      createBlogDto,
      file?.filename,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateBlog(
    @GetUser() user: User,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.blogService.updateBlog(
      id,
      updateBlogDto,
      file?.filename,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async deleteBlog(@Param('id') id: string) {
    return await this.blogService.deleteBlog(id);
  }
}
