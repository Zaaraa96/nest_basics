import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavour } from './entities/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavour) private readonly flavorRepo: Repository<Flavour>
    
    ){}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)),
    );
    const coffee = await this.coffeeRepo.create({...createCoffeeDto,
      flavors
    });
    return this.coffeeRepo.save(coffee);
  }

  findAll(paginationQuery:PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepo.find(
      {
        relations: ['flavors'],
        skip: offset,
        take: limit,
      }
    );
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepo.findOne({where: {id}, relations: ['flavors']});
    if(!coffee)
      throw(new NotFoundException('no coffee with this id'));
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)),
    );
    const coffee = await this.coffeeRepo.preload({
      id: id,
       ...updateCoffeeDto,
       flavors
      });
       if(!coffee)
      throw(new NotFoundException('no coffee with this id'));
    return this.coffeeRepo.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepo.remove(coffee);
  }

  private async preloadFlavourByName(name:string): Promise<Flavour> {
    const existingFlavour = await this.flavorRepo.findOne({where: {name}});
    if(existingFlavour)
      return existingFlavour;

    return this.flavorRepo.create({ name });  
  }
}
