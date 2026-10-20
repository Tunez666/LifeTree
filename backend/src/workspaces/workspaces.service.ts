import {
    ConflictException,
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateWsDto } from './dto/createWs.dto';
import { EditWsDto } from './dto/editWs.dto';

@Injectable()
export class WorkspacesService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getWsByUser(userId: number) {
        const ws = await this.prisma.workspace.findMany({
            where: {
                userId: userId,
            },
        });

        if (!ws) {
            throw new NotFoundException(
                'У вас нет созданных пространств, создайте новое пространство',
            );
        }

        return ws;
    }

    async getWsById(wsId: number, userId: number) {
        const ws = await this.prisma.workspace.findFirst({
            where: {
                id: wsId,
                userId: userId,
            },
        });

        if (!ws) {
            throw new NotFoundException('Пространство не найдено');
        }

        return ws;
    }

    async createWs(dto: CreateWsDto, userId: number) {
        const existingWs = await this.prisma.workspace.findFirst({
            where: {
                userId,
                name: dto.name,
            },
        });

        if (existingWs) {
            throw new ConflictException(
                'Пространство с таким названием уже существует',
            );
        }

        const createWS =
            await this.prisma.workspace.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    userId: userId,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                },
            });

        return createWS;
    }

    async editWs(dto: EditWsDto, wsId: number, userId: number) {
        const ws = await this.prisma.workspace.findFirst({
            where: {
                id: wsId,
                userId: userId,
            },
        });

        if (!ws) {
            throw new NotFoundException('Пространство не найдено');
        }

        const updateWS =
            await this.prisma.workspace.update({
                where: {
                    id: wsId,
                },
                data: {
                    name: dto.name,
                    description: dto.description,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

        return updateWS;
    }

    async deleteWs(wsId: number, userId: number) {
        const ws = await this.prisma.workspace.findFirst({
            where: {
                id: wsId,
                userId: userId,
            },
        });

        if (!ws) {
            throw new NotFoundException('Пространство не найдено');
        }

        const dropWs =
            await this.prisma.workspace.delete({
                where: {
                    id: wsId,
                },
            });

        return {
            message: 'Пространство успешно удалено',
            id: dropWs.id,
        };
    }

}








