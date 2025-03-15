import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IntegerPipe implements PipeTransform{
    transform(value: any) {
        return Number(value);
    }
}