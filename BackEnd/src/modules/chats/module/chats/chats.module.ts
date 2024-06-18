import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsService } from '../../service/chats/chats.service';
import { ChatsController } from '../../controller/chats/chats.controller';
import { ChatsSchema } from '../../schemas/chats.schema';
import { ContactsSchema } from '../../../contacts/schemas/contacts.schema';
import { UserService } from '../../../user/service/user/user.service';
import { UserSchema } from '../../../user/schemas/user.schema';

@Module({
	imports: [
    MongooseModule.forFeature([{ name: 'Chats', schema: ChatsSchema}, { name: 'Contacts', schema:  ContactsSchema}, { name: 'User', schema: UserSchema }]) , ],
  	providers: [ChatsService, UserService],
  	controllers: [ChatsController],
})
export class ChatsModule {}
