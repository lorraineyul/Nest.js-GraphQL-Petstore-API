import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner])
  getOwners() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner)
  getOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('id', { type: () => Int }) id: number,
              @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
