import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pet.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createPetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pet
  }

  async findOne(petId: number): Promise<Pet> {
    return this.petsRepository.findOne({ where: { id: petId } });
  }

  async createPet(createPetInput: createPetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet(); new.name = input.name

    return this.petsRepository.save(newPet); // insert
  }

  async remove(id: number) {
    return this.petsRepository.delete({ id });
    } 
  

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  
}
