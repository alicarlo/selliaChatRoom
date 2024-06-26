import { Module } from '@nestjs/common';
import { ChatGateway } from '../../chatGateway'
import { ChatsService } from '../../../chats/service/chats/chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsSchema } from '../../../chats/schemas/chats.schema';
import { MessagesService } from '../../../messages/service/messages/messages.service'
import { MessagesSchema } from '../../../messages/schemas/messages.schema';
import { ContactsSchema } from '../../../contacts/schemas/contacts.schema';
import { SaveImagesService } from '../../../saveImages/services/save-images/save-images.service';
import { UserService } from '../../../user/service/user/user.service';
import { UserSchema } from '../../../user/schemas/user.schema';

@Module({
	imports: [
    MongooseModule.forFeature([{ name: 'Chats', schema: ChatsSchema }]),
		MongooseModule.forFeature([{ name: 'Messages', schema: MessagesSchema }]),
		MongooseModule.forFeature([{ name: 'Contacts', schema: ContactsSchema }]),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
	],
	providers: [ChatGateway, ChatsService, MessagesService, SaveImagesService, UserService],
})
export class ChatsSocketModule {}
