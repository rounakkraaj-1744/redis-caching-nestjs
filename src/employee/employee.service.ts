import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { PaginatedEmployeeDTO } from "./dto/paginated-employee.dto";
import { Prisma } from "@prisma/client";
import { EmployeeDTO } from "./dto/employee.dto";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService, private readonly redisService: RedisService) { }

  private readonly redisDB = 'employee';

  /* POST   ->  create, GET    ->  findUnique and findAll, PATCH  ->  update, DELETE ->  delete */
  async createEmployee(data: CreateEmployeeDto) {
    return this.prisma.info.create({
      data: {
        emp_name: data.emp_name,
        emp_id: data.emp_id,
        email: data.email
      }
    });
  }
  async findOneEmployee(id: Number) {
    return this.prisma.info.findUnique({
      where: { id: Number(id) }
    });
  }

  async findAllEmployee(options: { page: number, limit: number, sort?: { field: string, order: string }, 
    search?: string }): Promise<PaginatedEmployeeDTO> {
    
    const { page, limit, sort, search } = options;
    const orderBy = sort?.field && sort?.order ? { [sort.field]: sort.order } : undefined;
    
    const where: Prisma.InfoWhereInput | undefined = search?.trim()
      ? {
          OR: [
            { emp_name: { contains: search, mode: Prisma.QueryMode.insensitive } }, 
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } }
          ]
        }
      : undefined;
  
    const cacheKey = `${this.redisDB}:page=${page}&limit=${limit}&search=${search || ''}&sort=${JSON.stringify(sort)}`;
  
    const cachedEmployees = await this.redisService.get(cacheKey);
    if (cachedEmployees) {
      console.log('FROM REDIS');
      return JSON.parse(cachedEmployees);
    }
  
    console.log("Fetching from database...");
  
    try {
      const [data, total] = await Promise.all([
        this.prisma.info.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy
        }),
        this.prisma.info.count({ where })
      ]);
  
      const mappedData: EmployeeDTO[] = data.map(emp => ({
        id: emp.id,
        name: emp.emp_name,
        email: emp.email,
        empId: emp.emp_id,
        statusDelete: emp.statusDelete
      }));
  
      const response: PaginatedEmployeeDTO = { data: mappedData, page, limit, total };
  
      // Cache response in Redis with a TTL of 300 seconds (5 minutes)
      await this.redisService.set(cacheKey, JSON.stringify(response), 300);
  
      return response;
    }
    catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Failed to fetch employees");
    }
  }  
  

  async updateEmployee(id: Number, data: UpdateEmployeeDto) {
    return this.prisma.info.update({
      where: { id: Number(id) },
      data: {
        emp_name: data.emp_name,
        emp_id: data.emp_id,
        email: data.email
      }
    })
  }

  async deleteEmployee(id: Number) {
    return this.prisma.info.delete({
      where: { id: Number(id) }
    })
  }

  async findEmployeeByEmail(email: string) {
    const result = await this.prisma.info.findUnique({ where: { email } });
    if (result)
      return { data: result, message: "successfully searched" }
    else
      return { data: result, message: "Email Not Found" };
  }
}