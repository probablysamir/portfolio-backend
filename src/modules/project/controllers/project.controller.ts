import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/common/constants/role-type';
import { RolesGuard } from 'src/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/shared/providers/helpers';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions),
  )
  async createNewProject(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    if (file) return true;
    return await this.projectService.createProject(
      createProjectDto,
      file?.filename,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions),
  )
  async updateProject(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') id: string,
  ) {
    return await this.projectService.updateProject(
      updateProjectDto,
      file?.filename,
      id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async deleteProject(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }
}
