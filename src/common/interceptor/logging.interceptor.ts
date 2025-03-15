import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    console.log(`Incoming request: ${method} ${url}`);
    const startTime = Date.now();
    
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Response for ${method} ${url} took ${Date.now() - startTime}ms`,
          ),
        ),
      );
  }
}