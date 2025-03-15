import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { AuthDomainModule } from "../auth/auth-domain.module";

@Module({
    imports: [AuthDomainModule],
    controllers: [],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserDomainModule {}