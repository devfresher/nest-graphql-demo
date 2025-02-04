import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  type?: string;
}
