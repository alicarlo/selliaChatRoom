import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../../service/user/user.service';
import { UserController } from '../../controller/user/user.controller';
import { UserSchema } from '../../schemas/user.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
