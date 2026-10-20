import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [WorkspacesController],
  providers: [
    WorkspacesService,
  ],
})
export class WorkspacesModule {}