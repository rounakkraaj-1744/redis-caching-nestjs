import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate{
    constructor(private jwtService: JwtService){}
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=ctx.switchToHttp().getRequest();
        const authHeader=request.headers.authorization;
        console.log(authHeader);
        
        if(!authHeader || !authHeader.startsWith('Bearer '))
            throw new UnauthorizedException("Access Denied");
        
        try {
            const token=authHeader.split(' ')[1];            
            const payload=this.jwtService.verify(token);                  
            request.user=payload;
            console.log(request.user);            
            return true;
        } catch (error) {
            throw new UnauthorizedException('Access Denied. Invalid or Expired Token')
        }
    }
}