import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const password = await hash(dto.password, 10);

    const result = await this.prisma.user.create({
      data: {
        email: dto.email,
        password,
      },
    });

    console.log('result', result);
  }

  signin() {}

  logout() {}

  refresh() {}
}
