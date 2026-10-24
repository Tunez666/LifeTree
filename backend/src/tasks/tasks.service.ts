import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getTasks(workspaceId: number, userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        workspaceId,
        workspace: {
          is: {
            userId,
          },
        },
      },

      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        start_date: true,
        all_day: true,
        due_date: true,
        createdAt: true,
        updatedAt: true,

        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      tasks,
      total: tasks.length,
    };
  }

  async createTask(dto: CreateTaskDto, userId: number, workspaceId: number) {

    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        userId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Пространство не найдено');
    }

    const createTask =
      await this.prisma.task.create({
        data: {
          name: dto.name,
          description: dto.description,
          start_date: dto.start_date,
          due_date: dto.due_date,
          all_day: dto.all_day,
          workspaceId: workspaceId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspaceId: true,
          status: true,
          start_date: true,
          due_date: true,
          all_day: true,
          createdAt: true,
        },
      });

    return createTask;
  }

  async editTask(dto: EditTaskDto, taskId: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        workspace: {
          is: {
            userId,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Пространство не найдено');
    }

    const updateTask =
      await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          name: dto.name,
          description: dto.description,
          start_date: dto.start_date,
          due_date: dto.due_date,
          all_day: dto.all_day,
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return updateTask;
  }

  async deleteTask(taskId: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        workspace: {
          is: {
            userId: userId,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    const dropTask =
      await this.prisma.task.delete({
        where: {
          id: taskId,
        },
      });

    return {
      message: 'Задача успешно удалена',
      id: dropTask.id,
    };
  }


}