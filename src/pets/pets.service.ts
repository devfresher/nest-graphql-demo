import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(createPetInput: CreatePetInput, owner: Owner): Promise<Pet> {
    const pet = await this.petsRepository.findOneBy({
      name: createPetInput.name,
      owner
    });

    if (pet) {
      throw new ConflictException('Pet with this name already exist');
    }

    const newPet = this.petsRepository.create({
      ...createPetInput,
      owner: { id: owner.id },
    });

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
