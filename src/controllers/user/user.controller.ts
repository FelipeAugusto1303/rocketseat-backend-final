import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { CreateUserBodySchema, UserFormSchema } from "./interfaces/user-form.shema";
import { ZodValidationPipe } from "src/infra/pipe/zod-validation-pipe";
import { UserService } from "src/domain/user/services/user.service";



@Controller("/user")
@UsePipes(new ZodValidationPipe(UserFormSchema))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userForm: CreateUserBodySchema) {
        return await this.userService.createUser(userForm) 
    }
}