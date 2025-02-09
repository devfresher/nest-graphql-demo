import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PetType } from './pet-type.enum';

@InputType()
export class CreatePetInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsEnum(PetType)
  @Field(() => String)
  type: PetType;
}
