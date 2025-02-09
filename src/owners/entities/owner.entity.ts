import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet])
  pets?: Pet[];
}
