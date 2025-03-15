import { Expose, Type } from 'class-transformer';
import { EmployeeDTO } from './employee.dto';

export class PaginatedEmployeeDTO {
  @Expose()
  @Type(() => EmployeeDTO)
  data: EmployeeDTO[];

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  total: number;
}