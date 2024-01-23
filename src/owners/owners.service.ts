import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  async findOne(ownerId: number): Promise<Owner> {
    return this.ownersRepository.findOne({ where: { id: ownerId } });
  }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(
      createOwnerInput as DeepPartial<Owner>,
    );

    return this.ownersRepository.save(newOwner);
  }

  async update(ownerId: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    await this.ownersRepository.update(ownerId, updateOwnerInput)
    const owner = await this.ownersRepository.findOneBy({id: ownerId}) 
    if (owner) {
      return owner
    }
  }

  async remove(ownerId: number) {
    const removeOwner = await this.ownersRepository.delete({ id: ownerId });

    if (removeOwner.affected == 1) {
      return `Owner with ID ${ownerId} deleted successfully.`;
    } else {
      return `Owner with ID ${ownerId} not found.`;
    }
  }
}
