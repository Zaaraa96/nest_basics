import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { DataSource, Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class CoffeesService {
    private readonly coffeeRepo;
    private readonly flavorRepo;
    private readonly connection;
    constructor(coffeeRepo: Repository<Coffee>, flavorRepo: Repository<Flavour>, connection: DataSource);
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavourByName;
}
