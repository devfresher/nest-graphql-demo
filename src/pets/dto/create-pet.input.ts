import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  type?: string;
}
