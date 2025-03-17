import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserBodySchema } from 'src/controllers/user/interfaces/user-form.shema';
import { AuthService } from 'src/domain/auth/services/auth.service';
import { LoginUserBodySchema } from 'src/controllers/user/interfaces/user-login.schema';
import { User } from '@prisma/client';
import { JwtDomainService } from 'src/domain/jwt/service/jwt-domain.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService,
    private readonly jwtService: JwtDomainService,
  ) {}

  async createUser(userData: CreateUserBodySchema) {
    const user: User | null = await this.repository.findUserByEmail(
      userData.email,
    );
    if (user) {
      throw new BadRequestException({
        message: 'Email already in use',
        code: 'EMAIL_ALREADY_IN_USE',
      });
    }

    const phone = await this.repository.findUserByPhone(userData.phone);
    if (phone) {
      throw new BadRequestException({
        message: 'Phone number already in use',
        code: 'PHONE_ALREADY_IN_USE',
      });
    }

    userData.password = await this.authService.hashPassword(userData.password);

    return await this.repository.createUser(userData);
  }

  async login(userData: LoginUserBodySchema): Promise<{ access_token: string }> {
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

    const token = await this.jwtService.generateToken(user);
    return token;
  }
}
