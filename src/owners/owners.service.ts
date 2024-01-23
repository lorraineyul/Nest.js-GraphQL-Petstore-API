import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

  findAll() {
    return this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOne({where: {id:id}});
  }

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput as DeepPartial<Owner>)

    return this.ownersRepository.save(newOwner);
  }


  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
