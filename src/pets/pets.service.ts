import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }
}
