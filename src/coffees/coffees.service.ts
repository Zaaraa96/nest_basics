import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { DataSource, Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavour } from './entities/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { ConfigService } from '@nestjs/config';

export class CoffeesService {

  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavour) private readonly flavorRepo: Repository<Flavour>,
    private readonly connection: DataSource, 
    private readonly configService: ConfigService
    ){
      const databaseHost = this.configService.get<string>('DATABASE_HOST');
      console.log(databaseHost);
      
    }

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
    const flavors = 
    updateCoffeeDto.flavors !=null?
    await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)),
    ): [];
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

  async recommendCoffee(coffee: Coffee){
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recomment_coffee';
      recommendEvent.type= 'coffee';
      recommendEvent.payload= { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }finally{
      await queryRunner.release();
    }
  }

  private async preloadFlavourByName(name:string): Promise<Flavour> {
    const existingFlavour = await this.flavorRepo.findOne({where: {name}});
    if(existingFlavour)
      return existingFlavour;

    return this.flavorRepo.create({ name });  
  }
}
