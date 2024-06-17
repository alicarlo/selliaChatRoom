import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../modules/auth/service/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'e9b8d0f5f8a77bb1c7b3e2d5c2a7632b8d7a2d3c3f7d2f1a6b8d4e9f1b8c7b6a3c2e8a4d9c7f8e2a1b3e7c8d2a6f3c4d1b7e5f9c3a8d2b5',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}