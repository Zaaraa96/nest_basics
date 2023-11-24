import { ApiProperty } from "@nestjs/swagger";

export class CreateCoffeeDto {
    @ApiProperty({
        required: true,
        example: 'moka'
    })
    name: string;
    @ApiProperty({
        required: true,
        example: 'starBux'
    })
    brand: string;
    @ApiProperty({
        required: true,
        example: ['chocolate']
    })
    flavors: string[];
}
