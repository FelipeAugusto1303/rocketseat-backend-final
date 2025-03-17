import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtDomainService } from './service/jwt-domain.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [JwtDomainService],
  exports: [JwtDomainService],
})
export class JwtDomainModule {}
