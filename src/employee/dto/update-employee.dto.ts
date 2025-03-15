import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsString()
    emp_name?: string | undefined;

    @IsInt()
    emp_id?: number | undefined;

    @IsEmail()
    email?: string | undefined;
}
