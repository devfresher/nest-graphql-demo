import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService,
    private readonly ownersService: OwnersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
    @CurrentUser() user: Owner,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput, user);
  }

  @Query(() => Pet)
  async pet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @ResolveField()
  async owner(@Parent() owner: Owner): Promise<Owner | null> {
    return this.ownersService.findOneById(owner.id);
  }
}
