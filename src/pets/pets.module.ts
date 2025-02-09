import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner])],
  controllers: [],
  providers: [PetsService, PetsResolver, OwnersService],
})
export class PetsModule {}
