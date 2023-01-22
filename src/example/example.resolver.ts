import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurants.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { ExampleService } from "./example.service";

@Resolver(() => Restaurant)
export class ExampleResolver {
    constructor(private readonly exampleService: ExampleService){}
    @Query(() => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.exampleService.getAll();
    }
    @Mutation(() => Boolean)
    createRestaurant(
        @Args() createRestaurantDto: CreateRestaurantDto
    ): boolean {
        console.log(createRestaurantDto);
        return true;
    }
}