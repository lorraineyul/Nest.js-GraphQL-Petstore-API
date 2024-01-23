import { Resolver, Query, Args, Mutation, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { createPetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(of => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(returns => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Query(returns => [Pet])
  getPets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @ResolveField(returns => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId)
  }

  @Mutation(returns => Pet)
  createPet(
    @Args('createPetInput') createPetInput: createPetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
