import {
    IsOptional,
    IsString,
    IsBoolean,
    IsDate,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    due_date?: Date;

    @IsOptional()
    @IsBoolean()
    all_day?: boolean;

}