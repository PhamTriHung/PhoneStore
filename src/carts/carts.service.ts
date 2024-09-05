import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { User } from 'src/users/users.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    const { userId } = createCartDto;

    const newCart = this.cartRepository.create();

    if (userId) {
      const user = await this.usersRepository.findOneBy({ id: userId });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      } else {
        newCart.user = user;
      }
    }

    return this.cartRepository.save(newCart);
  }
}
