import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getTasks(workspaceId: number) {

  const tasks = await this.prisma.task.findMany({
    where: {
        workspaceId,
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
    }
  });

  return {
    tasks: tasks,
    total: tasks.length,
  };
}

}