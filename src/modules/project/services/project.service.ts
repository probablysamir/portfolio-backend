import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(public readonly dataSource: DataSource) {}

  async getAllProjects() {
    console.log('I am called');
    return await this.dataSource
      .getRepository(Project)
      .find();
  }

  async createProject(
    payload: CreateProjectDto,
    filename: string,
  ) {
    payload.image = filename;
    const project: Project = await this.dataSource
      .getRepository(Project)
      .save(payload);

    return {
      success: true,
      data: project,
    };
  }

  async updateProject(
    payload: UpdateProjectDto,
    filename: string,
    id: string,
  ) {
    const project = await this.dataSource
      .getRepository(Project)
      .findOne({
        where: { id },
      });
    if (!project)
      throw new BadRequestException('Project not found');
    payload.image = filename;
    const updatedProject: Project = await this.dataSource
      .getRepository(Project)
      .save({ id: project.id, ...payload });
    return {
      success: true,
      data: updatedProject,
    };
  }

  async deleteProject(id: string) {
    return await this.dataSource
      .getRepository(Project)
      .delete(id);
  }
}
