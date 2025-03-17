import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';
import { AuthService } from 'src/domain/auth/services/auth.service';

describe('User service test', () => {
  let userRepository: UserRepository;
  let service: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
    userRepository = module.get<UserRepository>(UserRepository);
    service = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('User service', () => {
    it('Should be defined', async () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(authService).toBeDefined();
    });

    it('Should create a user', async () => {
        const userForm = {
            name: 'John Doe',
            email: 'john@email.com',
            phone: '123456789',
            password: '123456'
        }

        jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);
        jest.spyOn(userRepository, 'findUserByPhone').mockResolvedValue(null);
        jest.spyOn(authService, 'hashPassword').mockResolvedValue('hashed_password');

        const user = await service.createUser(userForm);

        expect(user).toBeDefined();
    })
  });
});
