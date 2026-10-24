import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    ParseIntPipe,
    Patch,
    Delete
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditTaskDto } from './dto/editTask.dto';


interface AuthenticatedRequest extends Request {
    user: {
        userId: number;
    };
}

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Patch(':id')
    editTask(
      @Body() dto: EditTaskDto,
      @Req() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) taskId: number,
    ) {
      return this.tasksService.editTask(
        dto,
        taskId,
        req.user.userId
      );
    }

    @Delete(':id')
    deleteTask(
      @Req() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) taskId: number,
    ) {
      return this.tasksService.deleteTask(
        taskId,
        req.user.userId,
      );
    }
}
