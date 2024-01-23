import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(type => Int)
  ownerId: number

  @Field()
  name: string;
}
