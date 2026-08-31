import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getDashboard(userId: number) {

  const workspaces = await this.prisma.workspace.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      name: true,
      description: true,

      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  const tasks = await this.prisma.task.findMany({
    where: {
      workspace: {
        userId,
      },
    },

    select: {
      id: true,
      name: true,
      status: true,
      start_date: true,
      due_date: true,

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

    take: 5,
  });

  return {
    workspaces,
    recentTasks: tasks,
  };
}

}