import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../modules/user/interfaces/user.interface';

@Injectable()
export class AuthService {
	constructor(@InjectModel('User') private readonly authModel: Model<User>, private readonly jwtService: JwtService,) {}

	async validateUser(email: string, password: string): Promise<{ user: User, token: string } | null> {
    const user = await this.authModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { email: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);
      return { user, token };
    }
    return null;
  }
}
