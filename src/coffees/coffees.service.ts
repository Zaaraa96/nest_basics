import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeesService {

  constructor(@InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>){}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this.coffeeRepo.create(createCoffeeDto);
    return this.coffeeRepo.save(coffee);
  }

  findAll() {
    return this.coffeeRepo.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepo.findOne({where: {id}});
    if(!coffee)
      throw(new NotFoundException('no coffee with this id'));
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepo.preload({
      id: id,
       ...updateCoffeeDto});
       if(!coffee)
      throw(new NotFoundException('no coffee with this id'));
    return this.coffeeRepo.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepo.remove(coffee);
  }
}
