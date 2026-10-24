import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksWsController } from './tasksWs.controller';
import { TasksController } from './tasks.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [TasksWsController, TasksController],
  providers: [
    TasksService,
    PrismaService,
  ],
})
export class TasksModule {}