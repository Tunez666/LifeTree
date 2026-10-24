import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
  };
}

@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getDashboard(@Req() req: AuthenticatedRequest) {
    return this.dashboardService.getDashboard(req.user.userId);
  }
}