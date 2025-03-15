import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let prismaService: PrismaService;

  const mockEmployee = {
    id: 1,
    emp_name: 'John Doe',
    emp_id: 1001,
    email: 'johndoe@example.com',
    statusDelete: false,
  };

  const mockPrismaService = {
    info: {
      create: jest.fn().mockResolvedValue(mockEmployee),
      findUnique: jest.fn().mockResolvedValue(mockEmployee),
      findMany: jest.fn().mockResolvedValue([mockEmployee]),
      update: jest.fn().mockResolvedValue(mockEmployee),
      delete: jest.fn().mockResolvedValue(mockEmployee),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe("findAllEmployee", ()=>{
    it('should return an array of employees', async () => {
      const result = await employeeService.findAllEmployee();
      expect(result).toEqual([mockEmployee]);
    });
  })

  describe("createEmployee", ()=>{
    it('should create a new employee', async () => {
      const result = await employeeService.createEmployee({
        emp_name: 'John Doe',
        emp_id: 1001,
        email: 'johndoe@example.com',
      });
      expect(result).toEqual(mockEmployee);
    });
  })
 

  describe("findOneEmployee", ()=>{
    it('should return an employee by ID', async () => {
      const result = await employeeService.findOneEmployee(1);
      expect(result).toEqual(mockEmployee);
    });
  })

  describe("updateEmployee", ()=>{
    it('should update an employee', async () => {
      const result = await employeeService.updateEmployee(1, {
        emp_name: 'new Rocky',
        emp_id: 1001,
        email: 'newrocky@mail.com',
      });
      expect(result).toEqual(mockEmployee);
    });
  })

  describe("deleteEmployee",()=>{
    it('should delete an employee', async () => {
      const result = await employeeService.deleteEmployee(1);
      expect(result).toEqual(mockEmployee);
    });
  })

  describe("findEmployeeByEmail", ()=>{
    it('should return an employee by email', async () => {
      const result = await employeeService.findEmployeeByEmail('newrocky@mail.com');
      expect(result).toEqual({ data: mockEmployee, message: 'successfully searched' });
    });
  })

  describe("findUnique", ()=>{
    it('should return "Email Not Found" if employee is not found', async () => {
      mockPrismaService.info.findUnique.mockResolvedValue(null);
      const result = await employeeService.findEmployeeByEmail('notfound@mail.com');
      expect(result).toEqual({ data: null, message: 'Email Not Found' });
    });
  })
});
