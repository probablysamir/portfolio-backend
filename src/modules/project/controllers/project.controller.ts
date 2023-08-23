import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/project.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  async getAllProjects() {
    console.log('I am called');
    return this.projectService.getAllProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewProject(
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.createProject(
      createProjectDto,
    );
  }
}
