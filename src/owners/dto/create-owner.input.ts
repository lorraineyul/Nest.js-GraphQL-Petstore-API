import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
  @Field(type => Int)
  ownerId: number

  @Field()
  name: string;
}
