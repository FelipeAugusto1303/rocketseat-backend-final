import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserBodySchema } from 'src/controllers/user/interfaces/user-form.shema';
import { AuthService } from 'src/domain/auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(userData: CreateUserBodySchema) {
    const user = await this.repository.findUserByEmail(userData.email);
    if (user) {
      throw new BadRequestException({
        message: 'Email already in use',
        code: 'EMAIL_ALREADY_IN_USE',
      });
    }

    userData.password = await this.authService.hashPassword(userData.password);

    return await this.repository.createUser(userData);
  }
}
