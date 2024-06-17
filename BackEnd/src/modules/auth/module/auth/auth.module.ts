import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../user/schemas/user.schema';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { AuthController } from '../../../auth/controller/auth/auth.controller';
import { JwtStrategy } from '../../../../jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		PassportModule,
    JwtModule.register({
      secret: 'e9b8d0f5f8a77bb1c7b3e2d5c2a7632b8d7a2d3c3f7d2f1a6b8d4e9f1b8c7b6a3c2e8a4d9c7f8e2a1b3e7c8d2a6f3c4d1b7e5f9c3a8d2b5', 
      signOptions: { expiresIn: '60M' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
