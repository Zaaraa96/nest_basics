import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private readonly coffeeRepo;
    constructor(coffeeRepo: Repository<Coffee>);
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
}
