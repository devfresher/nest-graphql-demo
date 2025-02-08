import { ConflictException, Injectable } from '@nestjs/common';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';
import { LoginResponse } from './dto/login.response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateOwner(email: string, password: string) {
    const user = await this.ownersService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpInput: SignUpInput) {
    const user = await this.ownersService.findOne(signUpInput.email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const password = await bcrypt.hash(signUpInput.password, 10);
    return this.ownersService.create({ ...signUpInput, password });
  }

  async login(user: Owner): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
