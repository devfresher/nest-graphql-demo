import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}
  async create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownerRepository.create(createOwnerInput);
    return await this.ownerRepository.save(owner);
  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(email: string) {
    return await this.ownerRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.ownerRepository.findOneBy({ id });
  }
}
