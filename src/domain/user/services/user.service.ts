import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserBodySchema } from 'src/controllers/user/interfaces/user-form.shema';
import { AuthService } from 'src/domain/auth/services/auth.service';
import { LoginUserBodySchema } from 'src/controllers/user/interfaces/user-login.schema';

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

  async login(userData: LoginUserBodySchema) {
    const user = await this.repository.findUserByEmail(userData.email);
    if (!user) {
      throw new BadRequestException({
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      });
    }

    const isPasswordValid = await this.authService.comparePassword(
      userData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException({
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      });
    }

    return user;
  }
}
