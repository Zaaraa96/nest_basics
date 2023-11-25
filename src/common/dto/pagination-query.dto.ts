import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(()=> Number)
    @ApiProperty({
        required: false,
        example: 10
    })
    limit: number = 10;
    @IsOptional()
    @IsPositive()
    @Type(()=> Number)
    @ApiProperty({
        required: false,
        example: 0
    })
    offset: number = 0;
}
