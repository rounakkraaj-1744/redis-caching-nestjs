import { IsEmail, IsInt, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    emp_name: string

    @IsInt()
    emp_id: number

    @IsEmail()
    email: string
}
