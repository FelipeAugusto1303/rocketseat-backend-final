import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserDomainModule } from 'src/domain/user/user-domain.module';
import { AuthDomainModule } from 'src/domain/auth/auth-domain.module';
import { JwtDomainModule } from 'src/domain/jwt/jwt-domain.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserDomainModule, AuthDomainModule, JwtDomainModule, JwtModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
