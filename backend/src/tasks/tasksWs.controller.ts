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

import type { Request } from 'express';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/createTask.dto';


interface AuthenticatedRequest extends Request {
    user: {
        userId: number;
    };
}

@Controller('workspaces/:workspaceId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksWsController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Get()
    getTasks(
        @Req() req: AuthenticatedRequest,
        @Param('workspaceId', ParseIntPipe) workspaceId: number,
    ) {
        return this.tasksService.getTasks(
            workspaceId,
            req.user.userId,
        );
    }

    @Post()
    createTask(
        @Req() req: AuthenticatedRequest,
        @Param('workspaceId', ParseIntPipe) workspaceId: number,
        @Body() dto: CreateTaskDto,
    ) {
        return this.tasksService.createTask(
            dto,
            req.user.userId,
            workspaceId
        );
    }
}
