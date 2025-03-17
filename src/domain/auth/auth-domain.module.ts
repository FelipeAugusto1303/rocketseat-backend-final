import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../jwt/service/jwt.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, JwtGuard, JwtService],
  exports: [AuthService],
})
export class AuthDomainModule {}
