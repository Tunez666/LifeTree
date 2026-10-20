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

import { WorkspacesService } from './workspaces.service';
import { CreateWsDto } from './dto/createWs.dto';
import { EditWsDto } from './dto/editWs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
  };
}

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createWs(
    @Body() dto: CreateWsDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspacesService.createWs(
      dto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getWsByUser(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspacesService.getWsByUser(
      req.user.userId,
    );
  }

@UseGuards(JwtAuthGuard)
  @Get(':id')
  getWsById(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) wsId: number
  ) {
    return this.workspacesService.getWsById(
      wsId,
      req.user.userId,
    );
  }

@UseGuards(JwtAuthGuard)
@Patch(':id')
editWs(
  @Body() dto: EditWsDto,
  @Req() req: AuthenticatedRequest,
  @Param('id', ParseIntPipe) wsId: number,
) {
  return this.workspacesService.editWs(
    dto,
    wsId,
    req.user.userId,
  );
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
deleteWs(
  @Req() req: AuthenticatedRequest,
  @Param('id', ParseIntPipe) wsId: number,
) {
  return this.workspacesService.deleteWs(
    wsId,
    req.user.userId,
  );
}

}