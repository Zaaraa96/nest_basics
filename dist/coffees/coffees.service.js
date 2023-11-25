"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const typeorm_2 = require("@nestjs/typeorm");
const flavour_entity_1 = require("./entities/flavour.entity");
const event_entity_1 = require("../events/entities/event.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepo, flavorRepo, connection) {
        this.coffeeRepo = coffeeRepo;
        this.flavorRepo = flavorRepo;
        this.connection = connection;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)));
        const coffee = await this.coffeeRepo.create({ ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepo.save(coffee);
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepo.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepo.findOne({ where: { id }, relations: ['flavors'] });
        if (!coffee)
            throw (new common_1.NotFoundException('no coffee with this id'));
        return coffee;
    }
    async update(id, updateCoffeeDto) {
        const flavors = await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavourByName(name)));
        const coffee = await this.coffeeRepo.preload({
            id: id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee)
            throw (new common_1.NotFoundException('no coffee with this id'));
        return this.coffeeRepo.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepo.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recomment_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavourByName(name) {
        const existingFlavour = await this.flavorRepo.findOne({ where: { name } });
        if (existingFlavour)
            return existingFlavour;
        return this.flavorRepo.create({ name });
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_2.InjectRepository)(flavour_entity_1.Flavour)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map