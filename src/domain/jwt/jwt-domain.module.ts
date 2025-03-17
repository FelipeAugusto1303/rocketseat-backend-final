import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtDomainService } from './service/jwt-domain.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'colocarChaveSecretaEmUmaVariavelDeAmbiente', // Mantenha isso seguro e use variáveis de ambiente
      signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
  ],
  controllers: [],
  providers: [JwtDomainService],
  exports: [JwtDomainService],
})
export class JwtDomainModule {}
