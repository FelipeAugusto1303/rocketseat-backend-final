import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token: string = request.headers['authorization']?.split(' ')[1];
    const { user } = context.switchToHttp().getRequest();
    

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.SECRET_JWT,
      });
      console.log(decoded);
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
