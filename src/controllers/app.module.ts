import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserDomainModule } from 'src/domain/user/user-domain.module';

@Module({
  imports: [UserDomainModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
