import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const EmailParam = createParamDecorator(
    (data:unknown, ctx:ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        const email = request.params.email;
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email))
            throw new BadRequestException("Invalid Email!!!");

        return email;
    }
);