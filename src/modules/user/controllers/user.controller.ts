import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUser } from 'src/decorators/getUser.decorator';
import { User } from '../entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleType } from 'src/common/constants/role-type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  generateFileName,
  imageFileFilter,
  pdfFileFilter,
} from 'src/shared/providers/helpers';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  async getAdminUser() {
    return await this.userService.getAdminInfo();
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @GetUser() user: User,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.userService.updateUser(user, payload);
  }

  @Post('portfolio')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(
    FileInterceptor('portfolio', {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: pdfFileFilter,
    }),
  )
  async uploadPortfolio(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.uploadPortfolio(
      user,
      file.filename,
    );
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadAvatar(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.uploadAvatar(
      user,
      file.filename,
    );
  }
}
