import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCoffeeDto {

    @ApiProperty({
        required: true,
        example: 'moka'
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        example: 'starBux'
    })
    @IsString()
    brand: string;

    @ApiProperty({
        required: true,
        example: ['chocolate','caramel']
    })
    @IsString({each:true})
    flavors: string[];
}
