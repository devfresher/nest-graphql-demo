import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PetType } from '../dto/pet-type.enum';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  type: PetType;

  @Column()
  @Field(() => Int)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner, { nullable: true })
  owner?: Owner;
}
