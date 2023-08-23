import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(public readonly dataSource: DataSource) {}

  async getAllProjects() {
    console.log('I am called');
    return await this.dataSource
      .getRepository(Project)
      .find();
  }

  async createProject(payload: CreateProjectDto) {
    const project: Project = await this.dataSource
      .getRepository(Project)
      .save(payload);

    return {
      success: true,
      data: project,
    };
  }
}
