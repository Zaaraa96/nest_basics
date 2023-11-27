import { Injectable, Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { Event } from '../events/entities/event.entity';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Coffee, Flavour, Event]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService,],
})
export class CoffeesModule {}
