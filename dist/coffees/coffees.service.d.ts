import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
export declare class CoffeesService {
    private readonly coffeeRepo;
    private readonly flavorRepo;
    constructor(coffeeRepo: Repository<Coffee>, flavorRepo: Repository<Flavour>);
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    private preloadFlavourByName;
}
