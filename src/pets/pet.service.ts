import { Pet } from './pet.entity';

export class PetService {
  findAll(): Pet[] {
    const pet = new Pet();
    pet.id = 1;
    pet.name = 'Cat';

    return [pet];
  }
}
