import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchUserService } from '../service/search-user/search-user.service';
import { SearchUserController } from '../controller/search-user/search-user.controller';
import { ContactsSchema } from '../../contacts/schemas/contacts.schema';
import { UserSchema } from '../../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Contacts', schema: ContactsSchema }]) ],
  	providers: [SearchUserService],
  	controllers: [SearchUserController],
})
export class SearchUserModule {}