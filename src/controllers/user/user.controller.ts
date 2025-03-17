import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserBodySchema, UserFormSchema } from "./interfaces/user-form.shema";
import { ZodValidationPipe } from "src/infra/pipe/zod-validation-pipe";
import { UserService } from "src/domain/user/services/user.service";
import { LoginUserBodySchema, UserLoginSchema } from "./interfaces/user-login.schema";
import { JwtGuard } from "src/domain/jwt/service/jwt.guard";



@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseGuards(JwtGuard)
    @UsePipes(new ZodValidationPipe(UserFormSchema))
    async createUser(@Body() userForm: CreateUserBodySchema) {
        return await this.userService.createUser(userForm) 
    }

    @Post("/login")
    @UsePipes(new ZodValidationPipe(UserLoginSchema))
    async login(@Body() userForm: LoginUserBodySchema) {
        return await this.userService.login(userForm) 
    }
}