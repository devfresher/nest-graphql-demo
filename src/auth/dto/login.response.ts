import { Field, ObjectType } from '@nestjs/graphql';
import { Owner } from '../../owners/entities/owner.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => Owner)
  user: Owner;

  @Field(() => String)
  access_token: string;
}
