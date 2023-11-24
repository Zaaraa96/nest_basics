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
let CoffeesService = class CoffeesService {
    constructor(coffeeRepo) {
        this.coffeeRepo = coffeeRepo;
    }
    async create(createCoffeeDto) {
        const coffee = await this.coffeeRepo.create(createCoffeeDto);
        return this.coffeeRepo.save(coffee);
    }
    findAll() {
        return this.coffeeRepo.find();
    }
    async findOne(id) {
        const coffee = await this.coffeeRepo.findOne({ where: { id } });
        if (!coffee)
            throw (new common_1.NotFoundException('no coffee with this id'));
        return coffee;
    }
    async update(id, updateCoffeeDto) {
        const coffee = await this.coffeeRepo.preload({
            id: id,
            ...updateCoffeeDto
        });
        if (!coffee)
            throw (new common_1.NotFoundException('no coffee with this id'));
        return this.coffeeRepo.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepo.remove(coffee);
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(coffee_entity_1.Coffee)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map