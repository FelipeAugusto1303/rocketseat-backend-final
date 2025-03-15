import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthDomainModule {}
