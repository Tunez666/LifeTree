import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser =
            await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

        if (existingUser) {
            throw new ConflictException(
                'Пользователь с таким email уже существует',
            );
        }

        const passwordHash = await bcrypt.hash(
            dto.password,
            10,
        );

        const user =
            await this.prisma.user.create({
                data: {
                    username: dto.username,
                    email: dto.email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                },
            });

        return user;
    }

    async login(dto: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            username: user.username,
        });

        return {
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        };
    }
}








