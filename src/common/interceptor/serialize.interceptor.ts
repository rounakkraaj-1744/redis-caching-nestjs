import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
  }
  
  export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const handleResult = next.handle();
  
      return handleResult.pipe(
        map((data) =>
          plainToInstance(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
    }
  }