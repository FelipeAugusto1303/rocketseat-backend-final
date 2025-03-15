import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserBodySchema } from "src/controllers/user/interfaces/user-form.shema";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export class UserRepository extends PrismaService{
    constructor() {
        super()
    }


    async createUser(userData: CreateUserBodySchema){
        return await this.user.create({
            data: userData
        })
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.user.findUnique({
            where: {
                email: email
            }
        })
    }

    
}