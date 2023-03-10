import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class ExampleService {
    constructor(@InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,){}
    getAll(): Promise<Restaurant[]> {
        return this.restaurants.find();
    }
}